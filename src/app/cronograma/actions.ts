'use server';

import { createClient } from "@/lib/supabase/server";
import { Project } from "@/lib/types";

export async function fetchProjects(nit: string): Promise<Project[]> {
    try {
        const supabase = createClient();

        // Fetch projects from Supabase for this client
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('nit', nit);

        if (error) {
            console.error('Error fetching projects from Supabase:', error);
            return [];
        }

        if (!data) return [];

        // Map database fields to Project type
        // Note: DB uses snake_case, Type uses camelCase
        return data.map((item: any) => ({
            id: item.id.toString(),
            title: item.title,
            description: item.description || '',
            reason: item.reason || '',
            imageUrl: item.image_url || '',
            dueDate: item.due_date || '',
            createdAt: item.created_at,
            status: item.status || 'pending',
        })) as Project[];
    } catch (error) {
        console.error('Unexpected error fetching projects:', error);
        return [];
    }
}
