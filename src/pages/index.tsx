import * as React from 'react';
import { Avatar } from '../components/avatar';
import { ParticleHeader } from '../components/ParticleHeader';
import { NavLink } from '../components/NavLink';
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
            <main role="main" className="main" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div className="intro" style={{textAlign: 'center'}}>
                    <ParticleHeader />
                    <div className="intro">
                        <Avatar size={175} imageUri={withPrefix('/best.jpg')} />
                        <div className="intro__text">
                            <h3 style={{marginBottom: 0}}>My name's Trevor,</h3>
                            <p>I'm a developer and designer based in Washington, DC</p>
                        </div>
                        <nav className="intro__links">
                            <NavLink icon="github" url="https://github.com/trevor-atlas/" />
                            <NavLink icon="twitter" url="https://twitter.com/trevor-atlas/" />
                            <NavLink text="Blog" url={''} />
                            <NavLink text="Portfolio" url={''} />
                        </nav>
                    </div>
                </div>
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
