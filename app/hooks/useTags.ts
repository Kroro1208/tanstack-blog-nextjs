import type { Tag } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useTags = () => {
    const { data: dataTags, isLoading: isLoadingTags } = useQuery<Tag[]>({
        queryKey: ["tags"],
        queryFn: async () => {
            const response = await axios.get('/api/tags');
            return response.data;
        }
    });

    return { dataTags, isLoadingTags }
}