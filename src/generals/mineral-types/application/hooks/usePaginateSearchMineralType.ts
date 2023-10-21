import { type ResponsePagination, type RequestPagination } from '@/shared/domain';
import { DefinedUseQueryResult, useQuery, type UseQueryResult } from '@tanstack/react-query';
import { type MineralTypeResponse, type MineralTypeFilter } from '../../domain';
import { MineralTypeRepository } from '../../infrastructure';
import { PAGINATE_SEARCH } from './QueryKeys';

const usePaginateSearchMineralType = (
	searchFilter: RequestPagination<MineralTypeFilter>,
): UseQueryResult<ResponsePagination<MineralTypeResponse>, Error> => {
	return useQuery({
		queryKey: [PAGINATE_SEARCH, searchFilter],
		queryFn: async () => await MineralTypeRepository.paginatedSearch(searchFilter),
		retry: 0,
		refetchOnWindowFocus: false,
	});
};

export default usePaginateSearchMineralType;
