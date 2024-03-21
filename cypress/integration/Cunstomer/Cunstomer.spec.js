// Function to add a new customer
function addCustomer(firstName, lastName, postalCode) {
    cy.visit("https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust");

    cy.get(":nth-child(1) > .form-control").type(firstName);
    cy.get(":nth-child(2) > .form-control").type(lastName);
    cy.get(":nth-child(3) > .form-control").type(postalCode);

    // Click the add button
    cy.get("form.ng-dirty > .btn").click();

    cy.on("window:alert", (alertText) => {
        expect(alertText).to.include("Customer added successfully with customer id :");
    });

    // Open an account for the added customer
    cy.visit("https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount");
    cy.get("#userSelect").select("Abdellatif Bouzalim");
    cy.get("#currency").select("Dollar");
    cy.get("form.ng-dirty > button").click();
    cy.on("window:alert", (alertText) => {
        expect(alertText).to.include("Account created successfully with account Number :");
    });
}

// Function to perform customer login
function performLogin(firstName, lastName) {
    // Add a customer to perform the login
    addCustomer('Abdellatif', 'Bouzalim', '8000');
    cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
    cy.get('.borderM > :nth-child(1) > .btn').click();
    cy.get('#userSelect').select(`${firstName} ${lastName}`);
    cy.get('button[type="submit"]').click();
    cy.contains('Welcome').should('exist');
}

// Function to perform a deposit transaction
function performDeposit(amount) {
    cy.get('[ng-class="btnClass2"]').click();
    cy.get('.form-control').type(amount);
    cy.get('form.ng-dirty > .btn').click();
    cy.contains('Deposit Successful').should('exist');
}

// Function to perform a withdrawal transaction
function performWithdrawal(amount) {
    // Click the button to perform the withdrawal
    cy.get('[ng-class="btnClass3"]').click();
    cy.get('.form-control').type(amount);
    cy.get('form.ng-pristine > .btn').click();
    // reClick the button to perform the withdrawal
    cy.get('form.ng-pristine > .btn').click();
    cy.get('[ng-class="btnClass3"]').click();
    cy.get('.form-control').type(amount);

    cy.get('form.ng-dirty > .btn').click();
    cy.contains('Transaction successful').should('exist');
}

// Tests
describe('Cypress Tests', () => {
    it('Should perform login successfully', () => {
        performLogin('Abdellatif', 'Bouzalim');
    });

    it('Should perform a deposit successfully', () => {
        performDeposit(1000);
    });

    it('Should perform a withdrawal successfully', () => {
        performWithdrawal(500);
    });
});
