export function formatCurrency(amount){
    return new Intl.NumberFormat('he-IL',{
        style: 'currency',
        currency: 'ILS',
        minimumFractionDigits: 2,
    }).format(amount);
}

export function formatDate(date){
    return new Intl.DateTimeFormat('he-IL', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }).format(date);
}