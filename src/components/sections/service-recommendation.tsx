'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { handleServiceRecommendation } from '@/app/actions';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Wand2, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  needs: z.string().min(50, { message: "Please describe your needs in at least 50 characters." }),
});

export default function ServiceRecommendation() {
  const [recommendation, setRecommendation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      needs: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecommendation('');
    
    try {
      const result = await handleServiceRecommendation(values);
      if (result.recommendation) {
        setRecommendation(result.recommendation);
      } else {
        toast({
            title: "Error",
            description: result.error || "Could not generate a recommendation. Please try again.",
            variant: "destructive",
        });
      }
    } catch (e) {
      toast({
            title: "Error",
            description: "An unexpected error occurred. Please try again later.",
            variant: "destructive",
        });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="ai-tool" className="py-16 md:py-24 bg-card">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-accent px-3 py-1 text-sm text-primary font-semibold">AI-POWERED ASSISTANT</div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Find Your Perfect Solution</h2>
            <p className="text-foreground/80 text-lg">
              Not sure where to start? Describe your business goals and challenges, and our AI-powered tool will recommend the best Nyvara Group services to help you succeed. It's fast, easy, and tailored to you.
            </p>
          </div>
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                <Wand2 className="text-primary" />
                Service Recommender
              </CardTitle>
              <CardDescription>
                Tell us about your needs, and we'll suggest a path forward.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="needs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Needs & Goals</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., 'We're a startup looking to build an MVP for a new social media app. We also need to organize a launch event in 3 months...'"
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : 'Get Recommendation'}
                  </Button>
                </form>
              </Form>

              {recommendation && (
                <div className="mt-6 border-t border-border pt-6">
                   <h3 className="text-lg font-semibold flex items-center gap-2 text-primary">
                      <Sparkles className="h-5 w-5" />
                      Our Recommendation
                   </h3>
                   <div className="mt-4 text-foreground/90 whitespace-pre-wrap font-body">
                      {recommendation}
                   </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
