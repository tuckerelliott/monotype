/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero.js
  function parse(element, { document }) {
    const imageCell = document.createElement("div");
    const altCell = document.createElement("div");
    const textCell = document.createDocumentFragment();
    const heading = element.querySelector(".hero-left h1, .hero-left h2, h1, h2");
    if (heading) {
      textCell.appendChild(heading);
    }
    const description = element.querySelector(".hero-sub, .hero-left > p, p");
    if (description) {
      textCell.appendChild(description);
    }
    const ctaLinks = Array.from(
      element.querySelectorAll(".hero-actions > a.mt-cta, .hero-actions a.mt-cta, .hero-actions a")
    );
    if (ctaLinks.length > 0) {
      const ctaContainer = document.createElement("p");
      ctaLinks.forEach((link) => {
        const imgs = link.querySelectorAll("img");
        imgs.forEach((img) => img.remove());
        ctaContainer.appendChild(link);
      });
      textCell.appendChild(ctaContainer);
    }
    const cells = [
      [imageCell, altCell, textCell]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-stats.js
  function parse2(element, { document }) {
    const image = element.querySelector(".how-media img, .how-media picture, img");
    const heading = element.querySelector("h2.how-title, h2, .how-title");
    const subtitle = element.querySelector("p.how-subtitle, .how-subtitle, .how-copy > p");
    const statItems = Array.from(element.querySelectorAll(".problem-item"));
    const textCell = [];
    if (heading) textCell.push(heading);
    if (subtitle) textCell.push(subtitle);
    if (statItems.length > 0) {
      const statsList = document.createElement("ul");
      statItems.forEach((item) => {
        const stat = item.querySelector(".problem-stat");
        const copy = item.querySelector(".problem-copy");
        if (stat || copy) {
          const li = document.createElement("li");
          if (stat) {
            const strong = document.createElement("strong");
            strong.textContent = stat.textContent.trim();
            li.appendChild(strong);
          }
          if (copy) {
            const span = document.createElement("span");
            span.innerHTML = ` ${copy.innerHTML.trim()}`;
            li.appendChild(span);
          }
          statsList.appendChild(li);
        }
      });
      textCell.push(statsList);
    }
    const imageCell = [];
    if (image) imageCell.push(image);
    const cells = [
      [textCell, imageCell]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-stats", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-product.js
  function parse3(element, { document }) {
    const productCards = element.querySelectorAll(".product-card");
    const cells = [];
    productCards.forEach((card) => {
      const imageCell = [];
      const contentCell = [];
      const cardName = card.querySelector(".card-name");
      if (cardName) {
        const heading = document.createElement("h3");
        heading.textContent = cardName.textContent.replace(/\.\s*$/, "").trim();
        const contentHint = document.createComment(" field:content ");
        contentCell.push(contentHint);
        contentCell.push(heading);
      }
      const cardFeature = card.querySelector(".card-feature");
      if (cardFeature) {
        const desc = document.createElement("p");
        desc.textContent = cardFeature.textContent.trim();
        contentCell.push(desc);
      }
      const madeForLabel = card.querySelector(".made-for-label");
      const madeForList = card.querySelector(".made-for-list");
      if (madeForLabel && madeForList) {
        const audience = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = madeForLabel.textContent.trim();
        audience.appendChild(strong);
        audience.append(" " + madeForList.textContent.trim());
        contentCell.push(audience);
      }
      const ctaLink = card.querySelector("a.mt-cta");
      if (ctaLink) {
        const link = document.createElement("a");
        link.href = ctaLink.href;
        link.textContent = ctaLink.textContent.replace(/\s+/g, " ").trim();
        contentCell.push(link);
      }
      cells.push([imageCell, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-product", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-showcase.js
  function parse4(element, { document }) {
    const tabButtons = Array.from(element.querySelectorAll("button.monotype-portfolio-tab"));
    const tabPanels = Array.from(element.querySelectorAll(".monotype-portfolio-panel"));
    const cells = [];
    tabButtons.forEach((btn, index) => {
      const panel = tabPanels[index];
      if (!panel) return;
      const labelFrag = document.createDocumentFragment();
      labelFrag.appendChild(document.createComment(" field:tabLabel "));
      const labelText = document.createTextNode(btn.textContent.trim());
      labelFrag.appendChild(labelText);
      const contentFrag = document.createDocumentFragment();
      contentFrag.appendChild(document.createComment(" field:content "));
      const heading = panel.querySelector("h3");
      if (heading) {
        const h3 = document.createElement("h3");
        h3.textContent = heading.textContent.trim();
        contentFrag.appendChild(h3);
      }
      const desc = panel.querySelector(".monotype-portfolio-copy > p");
      if (desc) {
        const p = document.createElement("p");
        p.textContent = desc.textContent.trim();
        contentFrag.appendChild(p);
      }
      const featuresList = panel.querySelector("ul.monotype-portfolio-features");
      if (featuresList) {
        const ul = document.createElement("ul");
        const features = Array.from(featuresList.querySelectorAll("li.monotype-portfolio-feature"));
        features.forEach((feat) => {
          const li = document.createElement("li");
          const strong = feat.querySelector("strong");
          const span = feat.querySelector("span");
          if (strong) {
            const b = document.createElement("strong");
            b.textContent = strong.textContent.trim();
            li.appendChild(b);
            if (span) {
              li.appendChild(document.createTextNode(" "));
              const s = document.createElement("span");
              s.textContent = span.textContent.trim();
              li.appendChild(s);
            }
          }
          ul.appendChild(li);
        });
        contentFrag.appendChild(ul);
      }
      const ctaLink = panel.querySelector("a.mt-cta");
      if (ctaLink) {
        const a = document.createElement("a");
        a.href = ctaLink.href || ctaLink.getAttribute("href");
        a.textContent = ctaLink.textContent.trim();
        contentFrag.appendChild(a);
      }
      const img = panel.querySelector(".monotype-portfolio-visual img");
      if (img) {
        const image = document.createElement("img");
        image.src = img.src || img.getAttribute("src");
        image.alt = img.alt || img.getAttribute("alt") || "";
        contentFrag.appendChild(image);
      }
      cells.push([labelFrag, contentFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-showcase", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-testimonial.js
  function parse5(element, { document }) {
    const sectionHeading = element.querySelector("h2.workflow-tabs-title, .workflow-tabs-header h2");
    const tabButtons = Array.from(element.querySelectorAll(".workflow-tabs-nav button.workflow-tab, .workflow-tabs-nav .workflow-tab"));
    const panels = Array.from(element.querySelectorAll(".workflow-panels .workflow-panel"));
    const cells = [];
    tabButtons.forEach((btn, index) => {
      const panel = panels[index];
      if (!panel) return;
      const labelFrag = document.createDocumentFragment();
      labelFrag.appendChild(document.createComment(" field:label "));
      const labelText = document.createElement("p");
      labelText.textContent = btn.textContent.trim();
      labelFrag.appendChild(labelText);
      const contentFrag = document.createDocumentFragment();
      contentFrag.appendChild(document.createComment(" field:content "));
      const beforeSection = panel.querySelector(".workflow-card-before");
      if (beforeSection) {
        const eyebrow = beforeSection.querySelector("p.eyebrow");
        if (eyebrow) {
          const eyebrowEl = document.createElement("p");
          eyebrowEl.textContent = eyebrow.textContent.trim();
          contentFrag.appendChild(eyebrowEl);
        }
        const title = beforeSection.querySelector("h3.title, h3");
        if (title) {
          const h3 = document.createElement("h3");
          h3.textContent = title.textContent.trim();
          contentFrag.appendChild(h3);
        }
        const body = beforeSection.querySelector("p.body");
        if (body) {
          const bodyEl = document.createElement("p");
          bodyEl.textContent = body.textContent.trim();
          contentFrag.appendChild(bodyEl);
        }
      }
      const afterSection = panel.querySelector(".workflow-card-after");
      if (afterSection) {
        const flipLabel = afterSection.querySelector("p.flip-label");
        if (flipLabel) {
          const labelEl = document.createElement("p");
          labelEl.textContent = flipLabel.textContent.trim();
          contentFrag.appendChild(labelEl);
        }
        const quoteText = afterSection.querySelector(".flip-text");
        if (quoteText) {
          const blockquote = document.createElement("blockquote");
          blockquote.textContent = quoteText.textContent.trim();
          contentFrag.appendChild(blockquote);
        }
        const meta = afterSection.querySelector(".flip-meta");
        if (meta) {
          const metaEl = document.createElement("p");
          metaEl.innerHTML = `<em>${meta.textContent.trim()}</em>`;
          contentFrag.appendChild(metaEl);
        }
      }
      cells.push([labelFrag, contentFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-testimonial", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards.js
  function parse6(element, { document }) {
    const cardItems = element.querySelectorAll(".mt-item");
    const cells = [];
    cardItems.forEach((item) => {
      const imgEl = item.querySelector("img");
      const imageCell = [];
      if (imgEl) {
        const imageHint = document.createComment(" field:image ");
        const picture = imgEl.closest("picture") || imgEl;
        imageCell.push(imageHint);
        imageCell.push(picture);
      }
      const textCell = [];
      const textHint = document.createComment(" field:text ");
      textCell.push(textHint);
      const textContent = item.querySelector(".mt-content-text p, .mt-text-editor p");
      if (textContent) {
        const titleEl = document.createElement("strong");
        titleEl.textContent = textContent.textContent.trim();
        textCell.push(titleEl);
      }
      const linkEl = item.querySelector(".mt-content-text a[href], a.mt-image[href]");
      if (linkEl && linkEl.getAttribute("href")) {
        const ctaLink = document.createElement("a");
        ctaLink.setAttribute("href", linkEl.getAttribute("href"));
        ctaLink.textContent = textContent ? textContent.textContent.trim() : "Read more";
        textCell.push(ctaLink);
      }
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-cta.js
  function parse7(element, { document }) {
    const heading = element.querySelector("h2.cta-section-title, h1.cta-section-title, h2, h1");
    const description = element.querySelector(".cta-section-description, .mt-text-editor, p");
    const ctaContainer = element.querySelector(".cta-section-ctas");
    const ctaLinks = ctaContainer ? Array.from(ctaContainer.querySelectorAll("a.mt-cta, a")) : Array.from(element.querySelectorAll(":scope a.mt-cta, :scope a.button"));
    const cells = [];
    const headingCell = document.createDocumentFragment();
    headingCell.appendChild(document.createComment(" field:heading "));
    if (heading) {
      headingCell.appendChild(heading);
    }
    cells.push([headingCell]);
    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(" field:text "));
    if (description) {
      textCell.appendChild(description);
    }
    cells.push([textCell]);
    if (ctaLinks.length > 0) {
      const ctasCell = document.createDocumentFragment();
      ctasCell.appendChild(document.createComment(" field:ctas "));
      ctaLinks.forEach((link) => {
        const imgs = link.querySelectorAll('img[src^="data:image/svg"]');
        imgs.forEach((img) => img.remove());
        ctasCell.appendChild(link);
      });
      cells.push([ctasCell]);
    } else {
      cells.push([""]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-cta", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/monotype-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk"
      ]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        "header.global-mainheader",
        "footer",
        ".mt-skip-link",
        'iframe[title="Adobe ID Syncing iFrame"]',
        "noscript",
        "link"
      ]);
    }
  }

  // tools/importer/transformers/monotype-sections.js
  var H2 = { before: "beforeTransform", after: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === H2.after) {
      const { document } = payload;
      const sections = payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const reversedSections = [...sections].reverse();
      for (const section of reversedSections) {
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) continue;
        if (section.style) {
          const metadataBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(metadataBlock);
        }
        if (section !== sections[0]) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero": parse,
    "columns-stats": parse2,
    "cards-product": parse3,
    "tabs-showcase": parse4,
    "tabs-testimonial": parse5,
    "cards": parse6,
    "hero-cta": parse7
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Monotype homepage with hero, product showcases, and brand messaging",
    urls: ["https://www.monotype.com"],
    blocks: [
      {
        name: "hero",
        instances: ["section.hero"]
      },
      {
        name: "columns-stats",
        instances: ["section.how-section"]
      },
      {
        name: "cards-product",
        instances: ["section.selector-section"]
      },
      {
        name: "tabs-showcase",
        instances: ["section.monotype-portfolio-section"]
      },
      {
        name: "tabs-testimonial",
        instances: ["section.workflow-tabs-section"]
      },
      {
        name: "cards",
        instances: [".mt-gallery-listing"]
      },
      {
        name: "hero-cta",
        instances: [".mt-cta-section-default-wrapper"]
      }
    ],
    sections: [
      {
        id: "section-1-hero",
        name: "Hero",
        selector: "section.hero",
        style: "dark",
        blocks: ["hero"],
        defaultContent: []
      },
      {
        id: "section-2-how",
        name: "How Section",
        selector: "section.how-section",
        style: null,
        blocks: ["columns-stats"],
        defaultContent: []
      },
      {
        id: "section-3-selector",
        name: "Product Selector",
        selector: "section.selector-section",
        style: null,
        blocks: ["cards-product"],
        defaultContent: []
      },
      {
        id: "section-4-portfolio",
        name: "Portfolio Deep Dive",
        selector: "section.monotype-portfolio-section",
        style: null,
        blocks: ["tabs-showcase"],
        defaultContent: []
      },
      {
        id: "section-5-workflow",
        name: "Workflow Tabs",
        selector: "section.workflow-tabs-section",
        style: "dark",
        blocks: ["tabs-testimonial"],
        defaultContent: []
      },
      {
        id: "section-6-resources",
        name: "Resources Gallery",
        selector: ".mt-gallery-listing",
        style: null,
        blocks: ["cards"],
        defaultContent: []
      },
      {
        id: "section-7-cta",
        name: "CTA Banner",
        selector: ".mt-cta-section-default-wrapper",
        style: "accent",
        blocks: ["hero-cta"],
        defaultContent: []
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
