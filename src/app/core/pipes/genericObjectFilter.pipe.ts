import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'genericFilter'
})
export class GenericObjectFilterPipe implements PipeTransform {

    /**
     * implements method filter
     * @param array 
     * @param search 
     */
    transform(array: any[], search: string): any[] {
        if (search && search.length > 0) {
            return array.filter(object => {
                return this.searchInObject(object, search);
            });
        }
        return array;
    }

    /**
     * Recursive function search in object
     * @param object object to search   
     * @param search text 
     */
    searchInObject(object, search: string): boolean {
        if (object) {
            if (typeof (object) === 'object') {
                // retorna true solamente si un objeto en la iteración cumple la condición
                if (Object.values(object).some(item => {
                    return this.searchInObject(item, search);
                })) {
                    return true;
                }
            } else {
                if (String(object).toLowerCase().includes(search.toLowerCase())) {
                    return true;
                }
            }
        }
        return false;
    }
}
