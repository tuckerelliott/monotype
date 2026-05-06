/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroStepsParser from './parsers/hero-steps.js';
import columnsStatsParser from './parsers/columns-stats.js';
import cardsProductParser from './parsers/cards-product.js';
import tabsShowcaseParser from './parsers/tabs-showcase.js';
import tabsTestimonialParser from './parsers/tabs-testimonial.js';
import cardsParser from './parsers/cards.js';
import heroCtaParser from './parsers/hero-cta.js';

// TRANSFORMER IMPORTS
import monotypeCleanupTransformer from './transformers/monotype-cleanup.js';
import monotypeSectionsTransformer from './transformers/monotype-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-steps': heroStepsParser,
  'columns-stats': columnsStatsParser,
  'cards-product': cardsProductParser,
  'tabs-showcase': tabsShowcaseParser,
  'tabs-testimonial': tabsTestimonialParser,
  'cards': cardsParser,
  'hero-cta': heroCtaParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  monotypeCleanupTransformer,
  monotypeSectionsTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Monotype homepage with hero, product showcases, and brand messaging',
  urls: ['https://www.monotype.com'],
  blocks: [
    {
      name: 'hero-steps',
      instances: ['section.hero'],
    },
    {
      name: 'columns-stats',
      instances: ['section.how-section'],
    },
    {
      name: 'cards-product',
      instances: ['section.selector-section'],
    },
    {
      name: 'tabs-showcase',
      instances: ['section.monotype-portfolio-section'],
    },
    {
      name: 'tabs-testimonial',
      instances: ['section.workflow-tabs-section'],
    },
    {
      name: 'cards',
      instances: ['.mt-gallery-listing'],
    },
    {
      name: 'hero-cta',
      instances: ['.mt-cta-section-default-wrapper'],
    },
  ],
  sections: [
    {
      id: 'section-1-hero',
      name: 'Hero',
      selector: 'section.hero',
      style: 'dark',
      blocks: ['hero-steps'],
      defaultContent: [],
    },
    {
      id: 'section-2-how',
      name: 'How Section',
      selector: 'section.how-section',
      style: null,
      blocks: ['columns-stats'],
      defaultContent: [],
    },
    {
      id: 'section-3-selector',
      name: 'Product Selector',
      selector: 'section.selector-section',
      style: null,
      blocks: ['cards-product'],
      defaultContent: [],
    },
    {
      id: 'section-4-portfolio',
      name: 'Portfolio Deep Dive',
      selector: 'section.monotype-portfolio-section',
      style: null,
      blocks: ['tabs-showcase'],
      defaultContent: [],
    },
    {
      id: 'section-5-workflow',
      name: 'Workflow Tabs',
      selector: 'section.workflow-tabs-section',
      style: 'dark',
      blocks: ['tabs-testimonial'],
      defaultContent: [],
    },
    {
      id: 'section-6-resources',
      name: 'Resources Gallery',
      selector: '.mt-gallery-listing',
      style: null,
      blocks: ['cards'],
      defaultContent: [],
    },
    {
      id: 'section-7-cta',
      name: 'CTA Banner',
      selector: '.mt-cta-section-default-wrapper',
      style: 'accent',
      blocks: ['hero-cta'],
      defaultContent: [],
    },
  ],
};

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

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
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;

    const main = document.body;

    executeTransformers('beforeTransform', main, payload);

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

    executeTransformers('afterTransform', main, payload);

    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
