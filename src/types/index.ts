type Quote = {
  quote: string;
  author: string;
  xLink: string;
}

type QuoteList = Quote[];

type Song = {
  title: string;
  path: string;
}

export type { Quote, QuoteList, Song };
