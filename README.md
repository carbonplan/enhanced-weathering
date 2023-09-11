<p align="left" >
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://carbonplan-assets.s3.amazonaws.com/monogram/light-small.png">
  <img alt="CarbonPlan monogram." height="48" src="https://carbonplan-assets.s3.amazonaws.com/monogram/dark-small.png">
</picture>
</p>

# carbonplan / quantifying enhanced weathering

**a tool for exploring different quantitative methods that could be used in enhanced weathering MRV**

[![CI](https://github.com/carbonplan/python-project-template/actions/workflows/main.yaml/badge.svg)](https://github.com/carbonplan/python-project-template/actions/workflows/main.yaml)
[![License](https://img.shields.io/github/license/carbonplan/python-project-template?style=flat)](https://github.com/carbonplan/python-project-template/blob/main/LICENSE)

## resources

- main website: https://carbonplan.org/
- this site: https://carbonplan.org/research/ew-quantification
- explainer article: https://carbonplan.org/research/ew-quantification-explainer

## to build the site locally

Assuming you already have `Node.js` installed, you can install the build dependencies as:

```shell
npm install .
```

To start a development version of the site, simply run:

```shell
npm run dev
```

and then visit `http://localhost:5001/research/ew-quantification` in your browser.

## to build the EW data

You will need to unlock the Google Sheets key using [`git-crypt`](https://github.com/AGWA/git-crypt). Unlocking is simplest using a symmetric secret key securely shared by a team member.

Note: If you don't have mamba installed, conda can be used as a environment manager, just expect much longer solving times.

Once you have the gcp credentials stored, you can create a conda environment with the command:

`mamba env create --file binder/environment.yml`

Once this has been created, you can activate it with:

`mamba activate ew`

Then run the following python script to generate json data for the legend and quantification approach json data.

```
cd enhanced-weathering
python QA_to_json.py
```

Once you have re-generated the .json data. You can create a new branch and push to the repo.

## license

All the code in this repository is [MIT](https://choosealicense.com/licenses/mit/) licensed, but we request that you please provide attribution if reusing any of our digital content (graphics, logo, articles, etc.).

## about us

CarbonPlan is a non-profit organization that uses data and science for climate action. We aim to improve the transparency and scientific integrity of climate solutions with open data and tools. Find out more at [carbonplan.org](https://carbonplan.org/) or get in touch by [opening an issue](https://github.com/carbonplan/python-project-template/issues/new) or [sending us an email](mailto:hello@carbonplan.org).
