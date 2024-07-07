export const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Jakarta',
    };
    return date.toLocaleString('id-ID', options);
}

export const generatePagination = (currentPage: number, totalPages: number) => {
    if(totalPages <= 7) {
        return Array.from({length: totalPages}, (_, i) => i + 1);
    }

    if(currentPage <= 3) {
        return [1,2,3, "...", totalPages - 1, totalPages];
    }

    if(currentPage >= totalPages - 2) {
        return [1, 2, 3, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
    ]
}