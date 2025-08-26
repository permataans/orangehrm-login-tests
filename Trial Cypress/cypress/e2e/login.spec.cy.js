describe('Login Feature - OrangeHRM', () => {
    beforeEach(() => {
        // Kunjungi halaman login sebelum setiap test
        cy.visit('https://opensource-demo.orangehrmlive.com/');
    });

    it('TC01 - Login dengan kredensial valid', () => {
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        cy.get('[type="submit"]').click();

        // Verifikasi berhasil login
        cy.url().should('include', '/dashboard');
        cy.get('.oxd-topbar-header-breadcrumb').should('contain', 'Dashboard');
    });

    it('TC02 - Login dengan username invalid', () => {
        cy.get('[name="username"]').type('InvalidUser');
        cy.get('[name="password"]').type('admin123');
        cy.get('[type="submit"]').click();

        // Verifikasi pesan error
        cy.get('.oxd-alert-content-text').should('be.visible')
            .and('contain', 'Invalid credentials');
    });

    it('TC03 - Login dengan password invalid', () => {
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('wrongpassword');
        cy.get('[type="submit"]').click();

        // Verifikasi pesan error
        cy.get('.oxd-alert-content-text').should('be.visible')
            .and('contain', 'Invalid credentials');
    });

    it('TC04 - Login dengan username kosong', () => {
        cy.get('[name="password"]').type('admin123');
        cy.get('[type="submit"]').click();

        // Verifikasi pesan error
        cy.get('.oxd-input-field-error-message').should('be.visible')
            .and('contain', 'Required');
    });

    it('TC05 - Login dengan password kosong', () => {
        cy.get('[name="username"]').type('Admin');
        cy.get('[type="submit"]').click();

        // Verifikasi pesan error
        cy.get('.oxd-input-field-error-message').should('be.visible')
            .and('contain', 'Required');
    });

    it('TC06 - Login dengan kredensial kosong', () => {
        cy.get('[type="submit"]').click();

        // Verifikasi kedua pesan error muncul
        cy.get('.oxd-input-field-error-message').should('have.length', 2);
    });

    it('TC07 - Fitur "Forgot your password"', () => {
        cy.contains('Forgot your password?').click();
        cy.url().should('include', '/requestPasswordResetCode');
        cy.get('.orangehrm-forgot-password-title').should('contain', 'Reset Password');
    });
});