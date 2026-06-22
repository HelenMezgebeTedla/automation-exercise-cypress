describe('Automation Exercise Assignment', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

    beforeEach(() => {
        cy.visit('https://automationexercise.com')
    })

    it('Test Case 1: Verify Homepage Loads', () => {
        cy.get('body').should('be.visible')
        cy.get('.logo img').should('be.visible')
        cy.get('.nav').should('be.visible')
        cy.contains('Signup / Login').should('be.visible')
    })

    it('Test Case 2: Register a New User', () => {
        cy.contains('Signup / Login').click()
        const uniqueEmail = `testuser_${Date.now()}@example.com`
        cy.get('[data-qa="signup-name"]').type('Test User')
        cy.get('[data-qa="signup-email"]').type(uniqueEmail)
        cy.get('[data-qa="signup-button"]').click()
        cy.get('#id_gender1').check()
        cy.get('[data-qa="password"]').type('MySecurePassword123')
        cy.get('[data-qa="days"]').select('15')
        cy.get('[data-qa="months"]').select('January')
        cy.get('[data-qa="years"]').select('2000')
        cy.get('[data-qa="first_name"]').type('Test')
        cy.get('[data-qa="last_name"]').type('User')
        cy.get('[data-qa="address"]').type('123 Test Street')
        cy.get('[data-qa="country"]').select('United States')
        cy.get('[data-qa="state"]').type('California')
        cy.get('[data-qa="city"]').type('Los Angeles')
        cy.get('[data-qa="zipcode"]').type('90001')
        cy.get('[data-qa="mobile_number"]').type('1234567890')
        cy.get('[data-qa="create-account"]').click()
        cy.get('[data-qa="account-created"]').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
        cy.contains('Logged in as Test User').should('be.visible')
        cy.contains('Delete Account').click()
        cy.get('[data-qa="account-deleted"]').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
    })

    it('Test Case 3: Login With Valid Credentials', () => {
        cy.contains('Signup / Login').click()
        const loginEmail = `student_${Date.now()}@test.com`
        cy.get('[data-qa="signup-name"]').type('Test Student')
        cy.get('[data-qa="signup-email"]').type(loginEmail)
        cy.get('[data-qa="signup-button"]').click()
        cy.get('#id_gender1').check()
        cy.get('[data-qa="password"]').type('Password123!')
        cy.get('[data-qa="days"]').select('1')
        cy.get('[data-qa="months"]').select('January')
        cy.get('[data-qa="years"]').select('1990')
        cy.get('[data-qa="first_name"]').type('First')
        cy.get('[data-qa="last_name"]').type('Last')
        cy.get('[data-qa="address"]').type('123 Main St')
        cy.get('[data-qa="country"]').select('United States')
        cy.get('[data-qa="state"]').type('State')
        cy.get('[data-qa="city"]').type('City')
        cy.get('[data-qa="zipcode"]').type('12345')
        cy.get('[data-qa="mobile_number"]').type('12345678')
        cy.get('[data-qa="create-account"]').click()
        cy.get('[data-qa="continue-button"]').click()
        cy.contains('Logout').click()
        cy.login(loginEmail, 'Password123!')
        cy.contains('Logged in as Test Student').should('be.visible')
        cy.contains('Logout').click()
        cy.url().should('include', '/login')
    })

    it('Test Case 4: Login With Invalid Credentials', () => {
        cy.login('email@fake.com', 'WrongPassword123!')
        cy.contains('Your email or password is incorrect!').should('be.visible')
    })

    it('Test Case 5: Search for a Product', () => {
        cy.contains('Products').click()
        cy.url().should('include', '/products')
        cy.get('#search_product').type('dress')
        cy.get('#submit_search').click()
        cy.get('.title').should('contain', 'Searched Products')
        cy.get('.features_items').should('contain', 'Dress')
    })

    it('Test Case 6: View Product Details', () => {
        cy.contains('Products').click()
        cy.get('.choose > .nav > li > a').first().click()
        cy.url().should('include', '/product_details')
        cy.get('.product-information h2').should('be.visible')
        cy.get('.product-information').should('contain', 'Category:')
        cy.get('.product-information span span').should('be.visible')
        cy.get('.product-information').should('contain', 'Availability:')
        cy.get('.product-information').should('contain', 'Condition:')
        cy.get('.product-information').should('contain', 'Brand:')
    })

    it('Test Case 7: Add Product to Cart', () => {
        cy.contains('Products').click()
        cy.get('.productinfo').first().trigger('mouseover')
        cy.get('.productinfo a[data-product-id="1"]').first().click({ force: true })
        cy.get('.modal-content').should('be.visible')
        cy.contains('u', 'View Cart').click()
        cy.url().should('include', '/view_cart')
        cy.get('#cart_info_table').should('be.visible')
        cy.get('.cart_price').should('be.visible')
        cy.get('.cart_quantity').should('be.visible')
    })

    it('Test Case 8: Remove Product From Cart', () => {
        cy.contains('Products').click()
        cy.get('.productinfo').first().trigger('mouseover')
        cy.get('.productinfo a[data-product-id="1"]').first().click({ force: true })
        cy.get('.modal-content').should('be.visible')
        cy.contains('u', 'View Cart').click()
        cy.get('.cart_quantity_delete').click()
        cy.get('#empty_cart').should('be.visible')
        cy.get('#empty_cart').should('contain', 'Cart is empty!')
    })

    it('Test Case 9: Submit Contact Us Form', () => {
        cy.contains('Contact us').click()
        cy.get('[data-qa="name"]').type('Automation Learner')
        cy.get('[data-qa="email"]').type('student@test.com')
        cy.get('[data-qa="subject"]').type('Cypress Testing Homework')
        cy.get('[data-qa="message"]').type('This is an automated message sent by Cypress!')
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Press OK')
        })
        cy.get('[data-qa="submit-button"]').click()
        cy.get('.status').should('be.visible')
        cy.get('.status').should('contain', 'Success! Your details have been submitted successfully.')
    })

    it('Challenge 1: Add Multiple Products', () => {
        cy.contains('Products').click()
        cy.url().should('include', '/products')
        cy.get('.productinfo').eq(0).trigger('mouseover')
        cy.get('.productinfo a[data-product-id="1"]').first().click({ force: true })
        cy.get('.modal-content').should('be.visible')
        cy.contains('Continue Shopping').click()
        cy.get('.productinfo').eq(1).trigger('mouseover')
        cy.get('.productinfo a[data-product-id="2"]').first().click({ force: true })
        cy.get('.modal-content').should('be.visible')
        cy.contains('View Cart').click()
        cy.url().should('include', '/view_cart')
        cy.get('.cart_description').should('have.length.at.least', 2)
    })

    it('Challenge 3: Subscribe to Newsletter', () => {
        cy.get('#footer').scrollIntoView()
        cy.get('.single-widget h2').should('contain.text', 'Subscription')
        cy.get('#susbscribe_email').type('subscriber@example.com')
        cy.get('#subscribe').click()
        cy.get('.alert-success').should('be.visible')
        cy.get('.alert-success').should('contain.text', 'You have been successfully subscribed!')
    })

})