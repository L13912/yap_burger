/*import { API_URL } from '../../src/constants';
import '@4tw/cypress-drag-drop';
import {mockData} from "../../src/utils/data";*/

describe('should open localhost', () => {
    before(() => {
        cy.visit('http://localhost:3000')
    })
    it('should open constructor page by default', function () {
        cy.contains('Соберите бургер');
    });
    it('should open modal by click on the ingredient', function() {
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(2000)
        cy.get('[data-cypress-id="ingredientCard"]').first().as('ingredient')

        cy.get('@ingredient').click()

        cy.get('[data-cypress-id="modal"]').find('[data-cypress-id="detailsCard"]').as('ingredientModal')
        cy.get('@ingredientModal').contains('Краторная булка N-200i')
        cy.get('body').click(0,0);
        cy.get('@ingredientModal').should('not.exist');

        cy.get('@ingredient').click()
        cy.get('body').type('{esc}')
        cy.get('@ingredientModal').should("not.exist")
    });
})
