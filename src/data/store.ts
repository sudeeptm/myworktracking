import { ReviewArtifact, TeamMember, WorkEntry } from '../types';
import { teamMembers, workEntries } from './seed';

let entries = [...workEntries];
let members = [...teamMembers];
let reviews: ReviewArtifact[] = [];

export const getEntries = () => entries;
export const addEntry = (entry: WorkEntry) => {
  entries = [entry, ...entries];
};

export const getMembers = () => members;

export const addReview = (review: ReviewArtifact) => {
  reviews = [review, ...reviews];
};

export const getReviews = () => reviews;
