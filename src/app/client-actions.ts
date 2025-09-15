'use server';

/**
 * This file serves as a dedicated entry point for Server Actions that are
 * intended to be called from Client Components.
 *
 * It re-exports functions from the main actions.ts file, ensuring a clear
 * separation between server-side logic and client-side consumption. This
 * helps prevent bundling server-only dependencies into the client-side code.
 */

import { 
    handleServiceRecommendation,
    handleContactSubmission,
    handleSurveyAndRecommend 
} from './actions';

// We need to re-export the server actions individually
// instead of using `export * from './actions'` to comply with
// the "use server" directive.
export {
    handleServiceRecommendation,
    handleContactSubmission,
    handleSurveyAndRecommend
};
