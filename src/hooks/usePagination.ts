import { useMemo } from "react";

interface IusePaginationProps {
    totalPages: number,
    siblingCount: number,
    currentPage: number
}

const DOTS = '...';
const LEFT_DOTS = 'left...';
const RIGHT_DOTS = '...right';

const calRange = (startIndex: number, endIndex: number) =>{
    let length = endIndex - startIndex +1;
    return Array.from({length}, (_, idx) => idx + startIndex);
}

const usePagination = (props: IusePaginationProps) =>{
    const {totalPages, siblingCount, currentPage=1} = props;
    const paginationRange = useMemo(() =>{
        const totalPageNumbers = siblingCount + 5;

        if (totalPageNumbers >= totalPages){
            return calRange(1, totalPages);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPages

        if (!shouldShowLeftDots && shouldShowRightDots){
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = calRange(1, leftItemCount);
            return [...leftRange, RIGHT_DOTS, lastPageIndex];
        }

        if (shouldShowLeftDots && !shouldShowRightDots){
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = calRange(totalPages - rightItemCount + 1, totalPages);
            return [firstPageIndex, LEFT_DOTS, ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots){
            let middleRange = calRange(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, LEFT_DOTS, ...middleRange, RIGHT_DOTS, lastPageIndex];
        }
        else{
            return [];
        }

    }, [siblingCount, currentPage, totalPages])
    return [paginationRange] as const;
};


export default usePagination;