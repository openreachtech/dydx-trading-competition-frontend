<script>
import {
  defineComponent,
} from 'vue'

import {
  NuxtLink,
} from '#components'

import {
  definePageMeta,
} from '#imports'

import AppMessage from '~/components/units/AppMessage.vue'

import {
  BASE_PAGE_TITLE,
} from '~/app/constants'

import TermsPageContext from './TermsPageContext'

export default defineComponent({
  components: {
    NuxtLink,
    AppMessage,
  },

  setup (
    props,
    componentContext
  ) {
    definePageMeta({
      $furo: {
        pageTitle: `Terms of Use - ${BASE_PAGE_TITLE}`,
      },
    })

    const args = {
      props,
      componentContext,
    }
    const context = TermsPageContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-page">
    <h1 class="heading">
      Terms of Use
    </h1>

    <section class="unit-section">
      <p class="clause">
        These Terms of Use (the "Terms") govern your relationship with Crypto Learning Club, a company incorporated in
        Japan (the "CLC," "we," "our," "ours," and "us") and your use of (a) the website operated by us and located at
        https://dydxarena.com and (b) any materials, content, or services available therein (collectively, the "Site").
      </p>

      <p class="clause">
        Please read these Terms carefully as these Terms govern your use, rights and obligations as well as our
        disclaimers and limitations of legal liability in respect of the Site. By using the Site, you agree to be bound
        by these Terms. If you do not agree completely to these Terms, do not use the Site.
      </p>

      <AppMessage
        severity="info"
        variant="box"
        class="message"
      >
        THIS AGREEMENT CONTAINS A BINDING INDIVIDUAL ARBITRATION AGREEMENT AND CLASS ACTION WAIVER IN SECTION 14. THIS
        AFFECTS YOUR RIGHTS WITH RESPECT TO ANY "DISPUTE" BETWEEN YOU AND CLC AND MAY REQUIRE YOU TO RESOLVE DISPUTES IN
        BINDING, INDIVIDUAL ARBITRATION, AND NOT IN COURT. PLEASE READ THIS ENTIRE AGREEMENT, INCLUDING THAT PROVISION,
        CAREFULLY.
      </AppMessage>
    </section>

    <section class="unit-section">
      <h2 class="heading">
        1. Eligibility
      </h2>

      <p class="clause">
        <span class="index">1.1</span> You must be at least the age of majority in your jurisdiction to access or use
        the Site. By
        accessing or using the Site, you represent that you are at least the age of majority (e.g., 18 years of age) and
        have the full right, power, and authority to enter and comply with these Terms. If you access or use the Site on
        behalf of a legal entity, (a) all references to "you" throughout these Terms will include that entity, (b) you
        represent that you are authorized to accept these Terms on that entity's behalf, and (c) in the event you or the
        entity violates these Terms, the entity agrees to be responsible to us.
      </p>

      <p class="clause">
        <span class="index">1.2</span> You further represent that you are not (a) the subject of economic or trade
        sanctions
        administered or enforced by any governmental authority or otherwise designated on any list of prohibited or
        restricted parties, including but not limited to the list maintained by the U.S. Department of Treasury's Office
        of Foreign Assets Control, the European Union, the United Kingdom, Switzerland or the United Nations
        ("Sanctions") and is not under the control of any person or entity subject to Sanctions; or (b) a citizen,
        resident, or organized in a jurisdiction or territory that is based in the United States, Canada, the United
        Kingdom or any other jurisdiction that is a Restricted Jurisdiction pursuant to the dydx.trade Terms of Use
        (<NuxtLink
          href="https://dydx.trade/terms"
          class="link"
        >
          https://dydx.trade/terms
        </NuxtLink>)
      </p>
    </section>

    <section class="unit-section">
      <h2 class="heading">
        2. Intellectual Property Ownership
      </h2>

      <p class="clause">
        <span class="index">2.1</span> You acknowledge and agree that we own all legal or beneficial right, title,
        license and/or
        interest in the Site and its contents, including but not limited to software, text, images, all trademarks,
        service marks, and trade names ("Materials"). You acknowledge that Materials are protected by copyright, patent,
        and trademark laws, international conventions, other relevant intellectual property and proprietary rights, and
        applicable laws.
      </p>

      <p class="clause">
        <span class="index">2.3</span> Subject to your compliance with these Terms, we provide you a limited, personal,
        non-exclusive,
        nontransferable, non-assignable, fully revocable license to use the Site for your individual use. This license
        is effective until terminated. We may terminate or suspend any or all portions or features of the Site at any
        time and for any reason or for no reason with no notice or liability to you. This license does not give you any
        ownership rights in the Materials. This license does not give you any rights in the trade or service marks you
        see on the Site. You may not use, copy, reproduce, or distribute any part of the names, logos, or other trade or
        service marks you see on the Site without the prior written consent from us.
      </p>
    </section>

    <section class="unit-section">
      <h2 class="heading">
        3. Use of the Site and Prohibited Conduct
      </h2>

      <p class="clause">
        <span class="index">3.1</span> It is solely your responsibility to ascertain the applicable terms and conditions
        of each
        trading league or competition ("T&Cs") that you desire to join or participate in and to comply with any local
        laws or regulations which you may be subjected to as a result of your continued use of the Site and/or your
        participation in a trading competition. You further acknowledge that each T&Cs of a trading competition are set
        at the sole discretion of the respective host of the trading league and that CLC or any other third parties do
        not have any control or discretion over those T&Cs or the design and implementation of trading competitions.
      </p>

      <p class="clause">
        <span class="index">3.2</span> You agree not to engage in any of the following conduct (each, a “Prohibited
        Activity”) with respect to the Site:
      </p>

      <ol class="list ordered">
        <li class="entry">
          Any activity that seeks to interfere with or compromise the integrity, security, or proper functioning of
          any computer, server, network, personal device, or other information technology system, including (but not
          limited to) the deployment of viruses and denial of service attacks
        </li>
        <li class="entry">
          Any activity to defraud any person or entity, including but not limited to providing any false, inaccurate, or
          misleading information in order to unlawfully obtain the property of another;
        </li>
        <li class="entry">
          Any activity that violates any applicable law, rule, or regulation concerning the trading of securities,
          derivatives, or commodities; and
        </li>
        <li class="entry">
          Any activity to violate any other applicable law, contract, intellectual property right or other third-party
          right or commit a tort.
        </li>
      </ol>

      <p class="clause">
        <span class="index">3.3</span> If you engage in any of the Prohibited Activities, we may, at our sole and
        absolute discretion, without notice or liability to you, and without limiting any of our other rights or
        remedies at law or in equity, immediately suspend or terminate your access to the Site.
      </p>
    </section>

    <section class="unit-section">
      <h2 class="heading">
        4. Termination
      </h2>

      <p class="clause">
        <span class="index">4.1</span> We may, at any time and at our sole discretion, suspend, terminate, deactivate,
        and/or delete
        your access to or any part of the Site with or without notice to you for any reason or for no reason at all,
        including without limitation if: (i) you breach any provision of these Terms; (ii) you infringe any intellectual
        property rights; or (iii) you in engage in any Prohibited Activity.
      </p>

      <p class="clause">
        <span class="index">4.2</span> The following Sections of these Terms will survive termination of this agreement
        or
        discontinuation of your access to any part of the Site or the Interface: Section 8 (Disclaimer and No
        Warranties), Section 9 (Indemnification), Section 10 (Limitation of Liability), Section 11 (Release), Section 14
        (Dispute Resolution and Binding Arbitration), Section 17 (Third Party Links), and Section 18 (Special
        Disclaimer).
      </p>
    </section>

    <section class="unit-section">
      <h2 class="heading">
        5. No Fiduciary Duties
      </h2>

      <p class="clause">
        <span class="index">5.1</span> These Terms are not intended to, and do not, create or impose any fiduciary
        duties on us. To
        the fullest extent permitted by law, you acknowledge and agree that we owe no fiduciary duties or liabilities to
        you or any other party, and that to the extent any such duties or liabilities may exist at law or in equity,
        those duties and liabilities are hereby irrevocably disclaimed, waived, and eliminated.
      </p>
    </section>

    <section class="unit-section">
      <h2 class="heading">
        6. No Professional Advice
      </h2>

      <p class="clause">
        <span class="index">6.1</span> You agree and understand that all information provided by the Site is for
        informational and/or
        entertainment purposes only and should not be construed as legal, regulatory, financial, or tax advice. You
        should not take, or refrain from taking, any action based on any information contained in the Site or the Site.
        You should seek independent advice from professional advisers before making any decisions involving your use of
        the Site.
      </p>
    </section>

    <section class="unit-section">
      <h2 class="heading">
        7. Disclaimers and No Warranties
      </h2>

      <p class="clause">
        <span class="index">7.1</span> YOU EXPRESSLY UNDERSTAND AND AGREE THAT YOUR ACCESS TO AND USE OF THE SITE IS AT
        YOUR SOLE
        RISK, AND THAT ACCESS TO THE SITE IS PROVIDED "AS IS" AND "AS AVAILABLE". TO THE FULLEST EXTENT PERMISSIBLE
        PURSUANT TO APPLICABLE LAW, WE MAKE NO EXPRESS WARRANTIES AND HEREBY DISCLAIM ALL IMPLIED WARRANTIES REGARDING
        ANY PART OF THE SITE, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
        NON-INFRINGEMENT, CORRECTNESS, ACCURACY, OR RELIABILITY. WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, WE DO
        NOT REPRESENT OR WARRANT THAT ACCESS TO THE SITE WILL BE CONTINUOUS, UNINTERRUPTED, TIMELY, OR SECURE; THAT THE
        INFORMATION CONTAINED IN THE INTERFACE WILL BE ACCURATE, RELIABLE, COMPLETE, OR CURRENT; OR THAT THE SITE WILL
        BE FREE FROM ERRORS, DEFECTS, VIRUSES, OR OTHER HARMFUL ELEMENTS.
      </p>

      <p class="clause">
        <span class="index">7.2</span> YOU ACCEPT THE INHERENT SECURITY RISKS OF PROVIDING INFORMATION OVER THE
        INTERNET, YOU AND
        AGREE THAT WE HAVE NO LIABILITY OR RESPONSIBILITY FOR ANY BREACH OF SECURITY.
      </p>

      <p class="clause">
        <span class="index">7.3</span> WE WILL NOT BE RESPONSIBLE OR LIABLE TO YOU FOR ANY LOSSES YOU INCUR AS THE
        RESULT OF YOUR USE
        OF ANY BLOCKCHAIN NETWORK OR ANY DIGITAL ASSET WALLET OR OTHER ELECTRONIC WALLET, INCLUDING BUT NOT LIMITED TO
        ANY LOSSES, DAMAGES OR CLAIMS ARISING FROM: (i) USER ERROR, SUCH AS FORGOTTEN PASSWORDS OR INCORRECTLY CONSTRUED
        SMART CONTRACTS OR OTHER TRANSACTIONS; (ii) SERVER FAILURE OR DATA LOSS; (iii) CORRUPTED WALLET FILES; OR (iv)
        UNAUTHORIZED ACCESS OR ACTIVITIES BY THIRD PARTIES, INCLUDING BUT NOT LIMITED TO THE USE OF VIRUSES, PHISHING,
        BRUTEFORCING OR OTHER MEANS OF ATTACK AGAINST THE PLATFORM, BLOCKCHAIN NETWORK, OR ANY DIGITAL ASSET WALLET OR
        OTHER ELECTRONIC WALLET.
      </p>

      <p class="clause">
        <span class="index">7.4</span> WE ARE NOT RESPONSIBLE FOR LOSSES DUE TO BLOCKCHAINS OR ANY OTHER FEATURES OF ANY
        BLOCKCHAIN NETWORK OR ANY DIGITAL ASSET WALLET OR OTHER ELECTRONIC WALLET, INCLUDING BUT NOT LIMITED TO LATE
        REPORT BY DEVELOPERS OR REPRESENTATIVES (OR NO REPORT AT ALL) OF ANY ISSUES WITH THE BLOCKCHAIN SUPPORTING THE
        BLOCKCHAIN NETWORK, INCLUDING FORKS, TECHNICAL NODE ISSUES, OR ANY OTHER ISSUES HAVING FUND LOSSES AS A RESULT.
      </p>
    </section>

    <section class="unit-section">
      <h2 class="heading">
        8. Indemnification
      </h2>

      <p class="clause">
        <span class="index">8.1</span> To the fullest extent permitted by applicable law, you will indemnify, defend and
        hold
        harmless the CLC and our subsidiaries and affiliates, and each of our respective officers, directors, agents,
        partners and employees (individually and collectively, the "CLC Parties") from and against any losses,
        liabilities, claims, demands, damages, expenses or costs ("Claims") arising out of or related to (a) your access
        to or use of the Site (b) your violation of these Terms; (c) your violation, misappropriation, or infringement
        of any rights of another (including intellectual property rights or privacy rights); or (d) your conduct in
        connection with the Site. You agree to promptly notify the CLC of any third-party Claims, cooperate with the CLC
        Parties in defending such Claims and pay all fees, costs and expenses associated with defending such Claims
        (including attorneys' fees). You also agree that the CLC Parties will have control of the defense or settlement,
        at the CLC Parties' sole option, of any third-party Claims.
      </p>
    </section>

    <section class="unit-section">
      <h2 class="heading">
        9. Limitation of Liability
      </h2>

      <p class="clause">
        <span class="index">9.1</span> To the fullest extent permitted by applicable law, the CLC and the other CLC
        Parties will not
        be liable to you under any theory of liability—whether based in contract, tort, negligence, strict liability,
        warranty, or otherwise—for any indirect, consequential, exemplary, incidental, punitive or special damages or
        lost profits arising out of your use of the Site or inability to access the Site, and including in relation to
        your participation in any trading competitions, even if the CLC or the other CLC Parties have been advised of
        the possibility of such damages.
      </p>

      <p class="clause">
        <span class="index">9.2</span> The total liability of the CLC and the other CLC Parties for any claim arising
        out of or
        relating to these Terms, regardless of the form of the action, is limited to the greater of $100 or the amount
        paid by you to use the Site.
      </p>

      <p class="clause">
        <span class="index">9.3</span> The limitations set forth in this Section 10 will not limit or exclude liability
        for the gross
        negligence, fraud or intentional misconduct of CLC or the other CLC Parties or for any other matters in which
        liability cannot be excluded or limited under applicable law.
      </p>
    </section>

    <section class="unit-section">
      <h2 class="heading">
        10. Release
      </h2>

      <p class="clause">
        <span class="index">10.1</span> To the fullest extent permitted by applicable law, you release CLC and the other
        CLC Parties
        from responsibility, liability, claims, demands and/or damages (actual and consequential) of every kind and
        nature, known and unknown (including claims of negligence), arising out of or related to disputes between users
        and the acts or omissions of third parties.
      </p>
    </section>

    <section class="unit-section">
      <h2 class="heading">
        11. Modification to these Terms
      </h2>

      <p class="clause">
        <span class="index">11.1</span> We may update, amend, alter, or modify these Terms in the future. You agree that
        the CLC may
        make changes to these Terms at any time and for any reason at its sole discretion. Your continued access or use
        of the Site after changes to these Terms will mean that you accept any and all of such changes. If you do not
        agree to the amended Terms, you must stop using the Site.
      </p>
    </section>

    <section class="unit-section">
      <h2 class="heading">
        12. Changes to the Site
      </h2>

      <p class="clause">
        <span class="index">12.1</span> We may update, amend, alter, change, or stop the Site, or any part of the Site,
        from time to
        time without prior notice to you.
      </p>

      <p class="clause">
        <span class="index">12.2</span> We do not have any maintenance, update, or support obligations with respect to
        the Site. You
        agree that our updates to the Site may change the requirements necessary to use the Site, and you agree that in
        such an event you are responsible for any necessary actions, including but not limited to updating software or
        hardware to access and use the Site.
      </p>

      <p class="clause">
        <span class="index">12.3</span> We are not responsible for any loss or harm related to your inability to access
        or use the
        Site.
      </p>
    </section>

    <section class="unit-section">
      <h2 class="heading">
        13. Dispute Resolution and Binding Arbitration
      </h2>

      <p class="clause">
        <span class="index">13.1</span> Please read the following section carefully because it requires you to arbitrate
        certain
        disputes and claims with us and limits the manner in which you can seek relief from us, unless you opt out of
        arbitration by following the instructions set forth below. No class or representative actions or arbitrations
        are allowed under this arbitration provision. In addition, arbitration precludes you from suing in court or
        having a jury trial.
      </p>

      <p class="clause">
        <span class="index">13.2</span> No Representative Actions. You agree that any dispute arising out of or related
        to these
        Terms or our Services is personal to you and the CLC and that any dispute will be resolved solely through
        individual action, and will not be brought as a class arbitration, class action or any other type of
        representative proceeding.
      </p>

      <p class="clause">
        <span class="index">13.3</span> Arbitration of Disputes. Any dispute, controversy or claim arising out of or
        relating to this
        Agreement, including the formation, interpretation, breach or termination thereof, including whether the claims
        asserted are arbitrable, will be referred to and finally determined by arbitration in accordance with the JAMS
        International Arbitration Rules. The tribunal will consist of a sole arbitrator. The seat of the arbitration
        will be Singapore. The language to be used in the arbitral proceedings will be English. Judgment upon the award
        rendered by the arbitrator may be entered by any court having jurisdiction thereof. The prevailing party in any
        arbitration shall be entitled to recover costs and attorneys' fees. Any notice shall be given in writing by
        electronic mail or posting to the CLC's online coordination systems and addressed to the party to be notified at
        the e-mail address or applicable username as the party may designate by 10 days' advance written notice to the
        other party.
      </p>
    </section>

    <section class="unit-section">
      <h2 class="heading">
        14. Governing Law and Venue
      </h2>

      <p class="clause">
        <span class="index">14.1</span> This Agreement shall be governed by and construed in accordance with the laws of
        Singapore without regard to the conflicts of law provisions thereof.
      </p>
    </section>

    <section class="unit-section">
      <h2 class="heading">
        15. Severability
      </h2>

      <p class="clause">
        <span class="index">15.1</span> If any provision or part of a provision of these Terms is unlawful, void or
        unenforceable,
        that provision or part of the provision is deemed severable from these Terms and does not affect the validity
        and enforceability of any remaining provisions.
      </p>
    </section>

    <section class="unit-section">
      <h2 class="heading">
        16. Third Party Links
      </h2>

      <p class="clause">
        <span class="index">16.1</span> The Site may contain links to third-party websites or services. These links are
        provided for
        your convenience. We are not responsible for the content, privacy and security practices of those third parties
        or the content on those third-party websites.
      </p>
    </section>

    <section class="unit-section">
      <h2 class="heading">
        17. Miscellaneous
      </h2>

      <p class="clause">
        <span class="index">17.1</span> The failure of the CLC to exercise or enforce any right or provision of these
        Terms will not
        operate as a waiver of such right or provision. These Terms reflect the entire agreement between the parties
        relating to the subject matter hereof and supersede all prior agreements, representations, statements and
        understandings of the parties. The section titles in these Terms are for convenience only and have no legal or
        contractual effect. Use of the word "including" will be interpreted to mean "including without limitation."
        Except as otherwise provided herein, these Terms are intended solely for the benefit of the parties and are not
        intended to confer third-party beneficiary rights upon any other person or entity. You agree that communications
        and transactions between us may be conducted electronically.
      </p>
    </section>

    <section class="unit-section">
      <h2 class="heading">
        18. Special Disclaimer
      </h2>

      <p class="clause">
        CLC has received a grant from the dYdX Ecosystem Development Program to
        create and administer the Site, without any ongoing control or direction
        by the dYdX Foundation, dYdX Trading Inc., dYdX Operations Services Limited and/or any other
        dYdX-affiliated entities (collectively, "dYdX Entities").
      </p>

      <p class="clause">
        CLC is fully independent from, and unaffiliated with, any of the dYdX
        entities.
      </p>

      <p class="clause">
        Under no circumstances shall any of the dYdX Entities be held liable for
        any loss or damage of any kind incurred as a result of the use of the
        Site or the information or the activities herein, including but not
        limited to, direct, indirect, incidental, punitive, and consequential
        damages.
      </p>
    </section>
  </div>
</template>

<style scoped>
/* Reset default margin block. */
.heading+*,
p+p,
section+section {
  margin-block-start: 0;
}

.unit-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  margin-inline: auto;
  margin-block: 4.5rem 7.5rem;

  max-width: var(--size-body-max-width);

  @media (30rem < width) {
    padding-inline: var(--size-body-padding-inline-desktop);
  }
}

.unit-page>.heading {
  font-size: var(--font-size-title);
  font-family: var(--font-family-heading);
  color: var(--color-text-primary);
}

.unit-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  color: var(--color-text-tertiary);
}

.unit-section>.heading {
  font-size: var(--font-size-extra);
  font-family: var(--font-family-heading);

  color: var(--color-text-primary);
}

.unit-section>.clause>.index {
  margin-inline-end: 0.25rem;

  font-size: var(--font-size-medium);
  font-family: var(--font-family-heading);

  color: var(--color-text-primary);
}

.unit-section>.message {
  font-size: var(--font-size-base);
  font-weight: 500;
}

.unit-section .link {
  color: var(--color-text-secondary);
}

.unit-section .link:hover {
  text-decoration: underline;
}

.unit-section .list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.unit-section .list.ordered {
  list-style-position: inside;
  list-style-type: upper-roman;
}

.unit-section .list > .entry {
  padding-inline-start: 0.75rem;

  color: var(--color-text-tertiary);
}
</style>
