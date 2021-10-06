/// <reference types="cypress" />

// Welcome to Cypress!
//
// I am trying to open the URL first
// https://on.cypress.io/introduction-to-cypress
//example to-do app
describe('Open URL', () => {
    beforeEach(() => {
        //npx cypress open
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit('http://jupiter.cloud.planittesting.com')
    })

     it('Click on Contact List Item', () => {
        cy.wait(500)

        cy.get('li[id=nav-contact]')
            .click()
        cy.wait(20)
        //cy.get('[id^=forename]').type('Priya')
        //cy.wait(20)
        //cy.get('[id^=email]').type('Priya.posa@gmail.com')
        //cy.get('[id^=message]').type('Testing Cypress')


        cy.get('[id^=forename]')
            .should('be.visible')
            .type('John Doe')
        cy.wait(50)
        cy.get('input[id^= email]')
            .should('be.visible')
            .type('john-doe@example.com')
        cy.wait(50)
        cy.get('textarea[id^=message]')
            .should('be.visible')
            .type('Testing Cypressm')
        cy.contains('Submit').click

    })



        it('Click on Item List', () => {
        cy.wait(500)

        cy.get('li[id=nav-shop]')
            .click()
        cy.wait(500)
        //Click buy button 2 times on ?Funny Cow? AND Click buy button 1 time on ?Fluffy Bunny?

        cy.contains('Funny Cow')
            .parent()
            .contains('Buy').dblclick()
        cy.wait(100)

        //Click buy button 1 time on ?Fluffy Bunny?

          cy.contains('Fluffy Bunny')
            .parent()
            .contains('Buy').click()
        //Click the cart menu

        cy.get('li[id=nav-cart]')
            .click()
        cy.wait(500)

        //Verify the items are in the cart

        expect(cy.get('td').contains('Funny Cow')).to.exist

        expect(cy.get('td').contains('Fluffy Bunny')).to.exist

       //expect(cy.get('//td[contains(text(),"Funny Cow")]/parent::tr/td/input[@value="2"]')).to.exist
       // cy.get('td[Funny Cow]')

        //quantity = cy.xpath('//td[contains(text(),"Funny Cow")]/parent::tr/td/input').value

    })


    it('Validate and find the cost of the total list', () => {

        //Buy 2 Stuffed Frog, 5 Fluffy Bunny, 3 Valentine Bear
        //2. Go to the cart page
        //3. Verify the subtotal for each product is correct

        cy.wait(500)

        cy.get('li[id=nav-shop]')
            .click()
        cy.wait(500)

        //Clicking on Buy
        //Stuffed frog

        cy.contains('Stuffed Frog')
            .parent()
            .contains('Buy').dblclick()
        cy.wait(100)

        //Fluffy Bunny
        for (var i = 1; i < 6; i++) {

            cy.contains('Fluffy Bunny')
                .parent()
                .contains('Buy').click()
        }
        //Valentine Bear
        for (var i = 1; i < 4; i++) {

            cy.contains('Valentine Bear')
                .parent()
                .contains('Buy').click()
        }


        //TO STORE COST
        function multiply(a, b) {
            return a * b
        }
        cy.contains('Stuffed Frog')
            .parent()
            .contains('$').then(($costFC) => {
                const SFCost = $costFC.text()
                var sfc = $costFC.text().split('$')
                sfc = multiply(sfc[1], 2)


                cy.contains('Valentine Bear')
                    .parent()
                    .contains('$').then(($costFC) => {
                        const VBCost = $costFC.text()
                        var vbc = $costFC.text().split('$')
                        vbc = multiply(vbc[1],3)


                        cy.contains('Fluffy Bunny')
                            .parent()
                            .contains('$').then(($costFC) => {
                                const FBunnyCost = $costFC.text()
                                var fbc = $costFC.text().split('$')
                                fbc = multiply(fbc[1], 5)




                                //Click the cart menu

                                cy.get('li[id=nav-cart]')
                                    .click()
                                cy.wait(500)

                                //Verify the items are in the cart

                                expect(cy.get('td').contains('Fluffy Bunny')).to.exist
                                expect(cy.get('td').contains('Stuffed Frog')).to.exist
                                expect(cy.get('td').contains('Valentine Bear')).to.exist

                                //Validating the cost

                                 //Valentine Bear                                 
                                expect(cy.get('td').contains(vbc)).to.exist

                                //Stuffed Frog
                                expect(cy.get('td').contains(sfc)).to.exist

                                //Fluffy Bunny
                                expect(cy.get('td').contains(fbc)).to.exist
                                        

                             
                            })
                    })

            })
    })



   

 
})
