import { NewsResponse } from "../types/news";

const PAGE_SIZE = process.env.REACT_APP_PAGE_SIZE || 10;
const NEW_URL = process.env.NEWS_URL || "https://newsapi.org/v2/everything";
const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

type NewsRequest = {
  page: number;
  pageSize?: number;
  query?: string;
  language?: string;
};

export const fetchNews = async ({
  page = 1,
  pageSize = PAGE_SIZE as number,
  query = "",
  language = "en",
}: NewsRequest): Promise<NewsResponse> => {
  //calculate date for last week
  const lastWeek = getSevenDaysAgoDate();

  // Formulate url
  const url = `${NEW_URL}?q=${query}&from=${lastWeek}&sortBy=publishedAt&apiKey=${API_KEY}&pageSize=${pageSize}&page=${page}&language=${language}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: NewsResponse = await response.json();
    return data;
  } catch (error: any) {
    console.log(error.message);
    return Promise.reject(new Error("error"));
  }
};

function getSevenDaysAgoDate() {
  // Get the current date
  const currentDate = new Date();

  // Calculate the date 7 days ago
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(currentDate.getDate() - 7);

  // Format the date as a string (e.g., "YYYY-MM-DD")
  const formattedDate = sevenDaysAgo.toISOString().split("T")[0];

  return formattedDate;
}
