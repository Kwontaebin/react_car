export function LocalStorage() {
    if(localStorage.getItem('highYear') === null) {
        localStorage.setItem('highYear', 2022);
    }

    if(localStorage.getItem('lowYear') === null) {
        localStorage.setItem('lowYear', 2011);
    }

    if(localStorage.getItem('lowMileage') === null) {
        localStorage.setItem('lowMileage', 0);
    }

    if(localStorage.getItem('highMileage') === null) {
        localStorage.setItem('highMileage', 122852);
    }

    if(localStorage.getItem('lowPrice') === null) {
        localStorage.setItem('lowPrice', 0);
    }

    if(localStorage.getItem('highPrice') === null) {
        localStorage.setItem('highPrice', 8630);
    }

    if(localStorage.getItem('page') === null) {
        localStorage.setItem("page", 1);
    }
}