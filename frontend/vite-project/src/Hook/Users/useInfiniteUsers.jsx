import { useInfiniteQuery } from "react-query";
import axios from "axios";

const fetchUsers = async ({ pageParam = 1, limit = 10 }) => {
  const { data } = await axios.get("http://localhost:3000/user/all", {
    params: { page: pageParam, limit },
  });
  return data;
};

const useInfiniteUsers = (limit = 10) => {
  return useInfiniteQuery(
    "infiniteUsers",
    ({ pageParam = 1 }) => fetchUsers({ pageParam, limit }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const maxPages = Math.ceil(lastPage.totalUsers / limit);
        const nextPage = allPages.length + 1;
        return nextPage <= maxPages ? nextPage : undefined;
      },
    }
  );
};

export default useInfiniteUsers;
