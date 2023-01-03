export type News = 		{
  id: number,
  data: {
    publishedAt: number,
    title: string;
    previewDescr: string;
    img: {
      src: string | null;
      alt: string | null;
    };
    content: string;
  }
}