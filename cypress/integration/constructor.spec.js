describe('should open localhost', () => {
    before(() => {
        cy.visit('http://localhost:3000')
    })

    it('should open constructor page by default', function () {
        cy.contains('Соберите бургер');
    });

    it('should test opening/closing modal by click on the ingredient', function() {
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(500)
        cy.get('[data-cypress-id="ingredientCard"]').first().as('ingredient')

        cy.get('@ingredient').click()

        cy.get('[data-cypress-id="modal"]').as('ingredientModal')
        cy.get('@ingredientModal').contains('Краторная булка N-200i')
        cy.get('body').click(0,0);
        cy.get('@ingredientModal').should('not.exist');

        cy.get('@ingredient').click()
        cy.get('@ingredientModal').find('svg').click()
        cy.get('@ingredientModal').should("not.exist")

        cy.get('@ingredient').click()
        cy.get('body').type('{esc}')
        cy.get('@ingredientModal').should("not.exist")
    });

    it('should test drag&drop an element', function (){
        cy.get('[data-cypress-id="ingredientCard"]').first().as('bun')
        cy.get('[data-cypress-id="ingredientCard"]:nth-child(3)').first().as('sauce')

        cy.get('@bun').trigger("dragstart")
        cy.get('[data-cypress-id="dragDropCont"]')
            .trigger("dragover")
            .trigger("drop")
            .trigger("dragend");

        cy.get('@sauce').trigger("dragstart")
        cy.get('[data-cypress-id="dragDropCont"]')
            .trigger("dragover")
            .trigger("drop")
            .trigger("dragend");
    })

    it('should create new order', function () {
        cy.get('[data-cypress-id="login"]').click()
        if(cy.contains('Вход')){
            cy.get('input[name=email]').type('13912@mail.ru')
            cy.get('input[name=password]').type('L13912')
            cy.get('button').contains('Войти').click()
            cy.get('[data-cypress-id="createOrder"]').click()
            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.wait(20000)
            cy.get('[data-cypress-id="modal"]').invoke('text').then(parseInt).should('be.gte', 0)
        }
        else{
            cy.get('[data-cypress-id="createOrder"]').click()
            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.wait(20000)
            cy.get('[data-cypress-id="modal"]').invoke('text').then(parseInt).should('be.gte', 0)
        }
    })
})
