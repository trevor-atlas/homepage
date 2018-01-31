import * as React from 'react';
import { Avatar } from '../components/avatar';
import { ParticleHeader } from '../components/ParticleHeader';
import { withPrefix } from 'gatsby-link'
import Link from 'gatsby-link';

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps {
    data: {
        site: {
            siteMetadata: {
                title: string
            }
        }
    }
}

export default class extends React.Component<IndexPageProps, {}> {
    constructor(props: IndexPageProps, context: any) {
        super(props, context)
    }

    public render() {
        return (
            <main role="main" className="main" style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div className="intro" style={{textAlign: 'center', zIndex: 100, color: '#333'}}>
                    <Avatar size={200} imageUri={withPrefix('/best.jpg')} />
                    <div className="intro__text">
                        <h3 style={{marginBottom: 0}}>Trevor Atlas</h3>
                        <p>Developer &amp; Designer based in Washington, DC</p>
                    </div>
                </div>
                    <ParticleHeader />
            </main>
        )
    }
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
