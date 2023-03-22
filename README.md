# resumeGenerator

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

<!-- To download to a pdf
npm install --save html2pdf.js

import html2pdf from 'html2pdf.js'

methods: {
  downloadPDF(sectionElement) {
    const options = {
      margin: [0, 0, 0, 0],
      filename: 'section.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }
    
    html2pdf()
      .from(sectionElement)
      .set(options)
      .save()
  }
}


<template>
  <div>
    <section ref="sectionToDownload">
      <!-- Content of the section
    </section>
    <button @click="downloadPDF($refs.sectionToDownload)">Download PDF</button>
  </div>
</template> -->
