// ambient (no imports/exports): lets `import css from './x.css'` type-check; see the css-text plugin in conf/rollup.config.js
declare module '*.css' {
  const content: string;
  export default content;
}
