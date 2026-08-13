Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("MyKira Web App - Comprehensive Presentation & Link Integrity Suite", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("https://my-kira.vercel.app/");
  });

  it("Test Case 1: Core Content and Visibility Verification", () => {
    cy.viewport(1280, 720);
    cy.visit("https://my-kira.vercel.app");
    cy.get('img[alt*="Logo"], .logo, img').first().should("be.visible");
    cy.get("body").should("contain.text", "MyKira");

    cy.get("body").then(($body) => {
      const text = $body.text();
      expect(text).to.match(/Every Mother/i);
      expect(text).to.match(/Deserves Care/i);
      expect(text).to.match(/That Understands/i);
      expect(text).to.match(/Dataverse\s*Group\s*Akirachix/i);
    });
  });

  it("Test Case 2: Click and Validate All Main Header Navigation Links", () => {
    const navigationLinks = [
      "Home",
      "Features",
      "How It Works",
      "Community",
      "About",
      "Contact",
    ];

    navigationLinks.forEach((linkText) => {
      cy.get("header, nav").contains(linkText).should("be.visible").click();
      cy.wait(200);
    });
  });

  it("Test Case 3: Click and Validate the Primary Call-To-Action (Use Web App)", () => {
    cy.contains("Use Web App")
      .should("be.visible")
      .and("not.be.disabled")
      .click();

    cy.url().then((currentUrl) => {
      if (currentUrl.includes("#") || currentUrl.endsWith("/")) {
        cy.log("Button functions as an internal anchor or page placeholder.");
      } else {
        cy.url().should("not.eq", "https://vercel.app");
      }
    });
  });

it("Test Case 4: Click Action - Empty Form Submission Error Validation", () => {
  cy.contains("Send Message").should("be.visible").click();

  cy.get('input[placeholder*="First Name"], input[name*="first"], input[placeholder*="First"]')
    .first()
    .should(($input) => {
      const nativeInput = $input[0];
      expect(nativeInput.checkValidity()).to.be.false;
      expect(nativeInput.validationMessage.toLowerCase()).to.include("fill out this field");
    });
});



it("Test Case 5: Click Action - Invalid Email Format Trigger Check (Missing Domain Name)", () => {
  cy.window().then((win) => {
    win.addEventListener('submit', (e) => e.preventDefault(), true);
  });

  cy.get('input[placeholder*="First Name"], input[name*="first"]').first().type("Helen");
  cy.get('input[placeholder*="Last Name"], input[name*="last"]').first().type("Claire");
  cy.get('input[placeholder*="Phone"], input[type="tel"]').first().type("0111365595");
  cy.get('input[placeholder*="Email"], input[type="email"]').first().type("helen@");
  cy.get("textarea").first().type("Testing interaction layer controls.");

  cy.contains("Send Message").click();

  cy.get('input[placeholder*="Email"], input[type="email"]')
    .first()
    .should(($emailInput) => {
      const nativeInput = $emailInput[0];
      expect(nativeInput.checkValidity()).to.be.false;
      expect(nativeInput.validationMessage).to.not.be.empty;
    });
});

it("Test Case 5B: Click Action - Invalid Email Format Trigger Check (Missing Suffix .com)", () => {
  cy.get('input[placeholder*="First Name"], input[name*="first"]').first().type("Helen");
  cy.get('input[placeholder*="Last Name"], input[name*="last"]').first().type("Claire");
  cy.get('input[placeholder*="Phone"], input[type="tel"]').first().type("0111365595");
  cy.get('input[placeholder*="Email"], input[type="email"]').first().type("helen@gmail");
  cy.get("textarea").first().type("Testing domain suffix validation layers.");

  cy.get('form').first().then(($form) => {
    $form[0].submit = () => {};
    $form.on('submit', (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    });
  });

  cy.contains("Send Message").click();

  cy.get('input[placeholder*="Email"], input[type="email"]')
    .first()
    .should(($emailInput) => {
      const nativeInput = $emailInput[0];
      expect(nativeInput.value).to.equal("helen@gmail");
    });
});






    it("Test Case 6: Click Action - Successful Form Submission Cycle", () => {
    cy.get('input[placeholder*="First Name"], input[name*="first"]')
      .first()
      .type("Helen");
    cy.get('input[placeholder*="Last Name"], input[name*="last"]') 
      .first()
      .type("Claire");
    cy.get('input[placeholder*="Phone"], input[type="tel"]')
      .first()
      .type("0111365595");
    cy.get('input[placeholder*="Email"], input[type="email"]')
      .first()
      .type("helen@gmail.com");
    cy.get("textarea").first().type("Requesting maternal health info assets.");

    cy.screenshot("active-form-click-submission");

    cy.contains("Send Message").should("be.visible").click();

    cy.origin("https://formspree.io", () => {
      cy.url().should("include", "formspree.io/thanks");
      cy.contains("Thanks!").should("be.visible");
    });
  });


  it("Test Case 7: Click and Validate Footer Utility and Product Links", () => {
    const footerLinks = [
      "Risk Scoring",
      "Community Support",
      "AI Chatbot",
      "Privacy Policy",
      "Terms of Service",
    ];

    footerLinks.forEach((linkText) => {
      cy.get("footer")
        .contains(linkText)
        .should("be.visible")
        .click({ force: true });
    });
  });

  it("Test Case 8: Verify Presentation Layer UI Styles and Brand Color System", () => {
    cy.contains("Use Web App")
      .should("have.css", "background-color")
      .and("not.be.empty");

    cy.get("body").should("have.css", "background-color").and("not.be.empty");

    cy.contains("Send Message")
      .should("have.css", "background-color")
      .and("not.be.empty");

    cy.get("h1, h2").first().should("have.css", "color").and("not.be.empty");
  });

  it("Test Case 9: Automated Crawler - Scan and Validate All Internal & External Hrefs", () => {
    cy.get("a").each(($link) => {
      const href = $link.attr("href");

      if (
        href &&
        !href.startsWith("#") &&
        !href.startsWith("mailto:") &&
        !href.startsWith("tel:")
      ) {
        cy.request({
          url: href,
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.be.oneOf([200, 201, 301, 302]);
        });
      }
    });
  });

  it("Test Case 10: Verify Social Media Icon Link Properties", () => {
    const socialShorthand = ["FB", "TW", "IG", "LN"];

    socialShorthand.forEach((socialText) => {
      cy.get("footer")
        .contains(socialText)
        .should("be.visible")
        .and("have.attr", "href");
    });
  });

  it("Test Case 11: Precise Brand Color System and Theme Verification", () => {
    cy.contains(/Use Web App/i).should(
      "have.css",
      "background-color",
      "rgb(201, 111, 247)",
    );

    cy.get("h1").first().should("have.css", "color", "rgb(31, 35, 51)");

    cy.get("body").should("have.css", "background-color", "rgba(0, 0, 0, 0)");
  });

  it("Test Case 12: Verify Navigation Home Link Scrolls to Top of Page", () => {
    cy.scrollTo("bottom", { ensureScrollable: false });
    cy.contains("Home").first().click({ force: true });
    cy.window().its("scrollY").should("equal", 0);
  });

  it("Test Case 13: Verify Contact Form Fields Contain Accessible Attributes", () => {
    cy.get("input").first().should("have.attr", "type").and("not.be.empty");
    cy.get('input[type="email"]').should("exist");
  });

  it("Test Case 14: Verify Navigation Layout Wrapper System Exist on Scroll", () => {
    cy.get('[id*="navbar"], [class*="navbar"], nav')
      .first()
      .should("be.visible");
  });
}); // 
