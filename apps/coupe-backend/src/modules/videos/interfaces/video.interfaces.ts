export interface VideoProps {
  videoId: string;
  title: string;
  description: string;
  publishedAt: string;
  duration: string;
  tags: string[];
  toObject?: () => any;
}

// Define type for the array of videos with details
export type VideosWithDetails = VideoProps[];