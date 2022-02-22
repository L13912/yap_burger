/*import { API_URL } from '../../src/constants';
import '@4tw/cypress-drag-drop';
import {mockData} from "../../src/utils/data";*/

describe('проверяем доступность страницы', () => {
    before(() => {
        cy.visit('http://localhost:3000')
    })
    it('should open constructor page by default', function () {
        cy.contains('Соберите бургер');
    });
})
