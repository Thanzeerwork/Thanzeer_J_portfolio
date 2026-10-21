import type { Metadata } from "next";
import type React from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Creating a custom n8n Node for WordPress: managing Custom Post Types | Thanzeer J",
  description: "Learn how to build a custom n8n node for WordPress to support Custom Post Types (CPTs), handle REST API pagination, and improve automation workflows without relying on HTTP requests.",
};

export default function Page_blog_creating_a_custom_n8n_node_for_wordpress_managing_custom_post_types() {
  return (
    <>
<article className="article wrap" data-astro-cid-zg7dkzxc><header className="article__head" data-astro-cid-zg7dkzxc><nav className="note crumbs" aria-label="Breadcrumb" data-astro-cid-zg7dkzxc><a href="/" className="link" data-astro-cid-zg7dkzxc>Home</a> / <a href="/" className="link" data-astro-cid-zg7dkzxc>Blog</a> / <a href="/topic/ai-in-practice" className="link note--ink" data-astro-cid-zg7dkzxc>AI in practice</a></nav><h1 className="h1 article__title" data-astro-cid-zg7dkzxc>Creating a custom n8n Node for WordPress: managing Custom Post Types</h1><p className="lead article__desc" data-astro-cid-zg7dkzxc>Learn how to build a custom n8n node for WordPress to support Custom Post Types (CPTs), handle REST API pagination, and improve automation workflows without relying on HTTP requests.</p><dl className="article__meta grid-12" data-astro-cid-zg7dkzxc><div data-astro-cid-zg7dkzxc><dt className="note" data-astro-cid-zg7dkzxc>Pillar</dt><dd data-astro-cid-zg7dkzxc>AI in practice</dd></div><div data-astro-cid-zg7dkzxc><dt className="note" data-astro-cid-zg7dkzxc>Published</dt><dd data-astro-cid-zg7dkzxc>09 Jun 2025</dd></div><div data-astro-cid-zg7dkzxc><dt className="note" data-astro-cid-zg7dkzxc>Reading</dt><dd data-astro-cid-zg7dkzxc>4 min</dd></div><div data-astro-cid-zg7dkzxc><dt className="note" data-astro-cid-zg7dkzxc>Words</dt><dd data-astro-cid-zg7dkzxc>880</dd></div></dl></header><figure className="article__cover" data-astro-cid-zg7dkzxc><img src="/_astro/n8n-nodes.DZBmC54u_ZrK1fK.webp" srcSet="/_astro/n8n-nodes.DZBmC54u_3hPav.webp 640w, /_astro/n8n-nodes.DZBmC54u_Z1PlCnc.webp 1024w, /_astro/n8n-nodes.DZBmC54u_1f4XwQ.webp 1600w" alt="n8n workflow canvas with custom nodes" sizes="(min-width: 1024px) 80vw, 100vw" loading="eager" fetchPriority="high" data-astro-cid-zg7dkzxc="true" decoding="async" width="2227" height="1673" /><figcaption className="note" data-astro-cid-zg7dkzxc>fig. 00 · n8n workflow canvas with custom nodes</figcaption></figure><div className="article__body grid-12" data-astro-cid-zg7dkzxc><aside className="toc" data-astro-cid-zg7dkzxc><p className="note note--ink" data-astro-cid-zg7dkzxc>Contents</p><ol data-astro-cid-zg7dkzxc><li data-astro-cid-zg7dkzxc><a href="/index.html#the-problem-official-wordpress-node-limitations" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>01</span> The Problem: Official WordPress Node Limitations</a></li><li data-astro-cid-zg7dkzxc><a href="/index.html#solution" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>02</span> Solution</a></li><li data-astro-cid-zg7dkzxc><a href="/index.html#solution-advantages" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>03</span> Solution Advantages</a></li><li data-astro-cid-zg7dkzxc><a href="/index.html#results" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>04</span> Results</a></li><li data-astro-cid-zg7dkzxc><a href="/index.html#how-to-test-the-node" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>05</span> How to Test the Node</a></li><li data-astro-cid-zg7dkzxc><a href="/index.html#screenshot" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>06</span> Screenshot</a></li><li data-astro-cid-zg7dkzxc><a href="/index.html#conclusions" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>07</span> Conclusions</a></li><li data-astro-cid-zg7dkzxc><a href="/index.html#resources" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>08</span> Resources</a></li></ol></aside><div className="prose" data-astro-cid-zg7dkzxc><p>In these last days of spring, before summer officially begins, I started experimenting with automation to create a chatbot capable of interacting with WordPress site content. The challenge was to build a stable MVP, quick to implement, with a good quality/time-cost ratio. The choice fell on <strong>n8n</strong>.</p>
<hr />
<h2 id="the-problem-official-wordpress-node-limitations">The Problem: Official WordPress Node Limitations</h2>
<p>n8n provides various nodes to obtain data from many sources, including WordPress, thanks to the dedicated official node. However, this node only supports three content types: <strong>posts</strong>, <strong>pages</strong>, and <strong>users</strong>. For those who use <strong>Custom Post Types (CPT)</strong>, this represents a significant limitation.</p>
<h3 id="workaround-with-http-request">Workaround with HTTP Request</h3>
<p>One possible solution is to use the <strong>HTTP Request</strong> node to point directly to the desired endpoint, for example:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="plaintext"><code><span className="line"><span>/wp-json/wp/v2/products</span></span></code></pre>
<p>This workaround works, but presents several complexities:</p>
<ul>
<li><strong>Manual authentication management</strong></li>
<li><strong>Non-standardized data structure</strong></li>
<li><strong>Lack of guided interface</strong> for filtering or exploring content</li>
</ul>
<h3 id="the-pagination-problem">The Pagination Problem</h3>
<p>One of the main problems that led me to develop a custom node is the need to obtain <strong>all contents</strong> of a Custom Post Type.</p>
<p>WordPress, for performance reasons, <strong>limits to 100</strong> the maximum number of elements returned for each request via REST API.</p>
<p>One possible solution is to create a <strong>loop</strong> in the n8n workflow, incrementing the <strong>page</strong> parameter until all data is obtained. However, a much <strong>cleaner and integrated</strong> solution is the one offered directly by the official WordPress node: the <strong>Get Many</strong> operation with the <strong>Return All</strong> flag, which automatically handles internal pagination.</p>
<h2 id="solution">Solution</h2>
<p>For the solution, I started from n8n’s standard repository, which provides all necessary dependencies and the linter for static code analysis: <a href="https://github.com/n8n-io/n8n-nodes-starter" target="_blank" rel="noopener">n8n-nodes-starter</a>.</p>
<p>For the code structure, a good foundation was provided by the official WordPress node, which allows performing the following operations on <strong>Posts</strong>, <strong>Pages</strong>, and <strong>Users</strong>:</p>
<ul>
<li><strong>Get</strong></li>
<li><strong>Get Many</strong></li>
<li><strong>Create</strong></li>
<li><strong>Update</strong></li>
<li><strong>Delete</strong></li>
</ul>
<h3 id="different-approach-dynamic-post-type-selection">Different Approach: Dynamic Post Type Selection</h3>
<p>The logic of the new node is slightly different: instead of pre-selecting the resource to work with, we subsequently select the post type from those provided by the <code>types</code> endpoint of WordPress REST APIs.</p>
<h3 id="dynamic-field-implementation">Dynamic Field Implementation</h3>
<p>To do this, we need a new node property: an options field dynamically populated by the <code>getPostTypes</code> method.</p>
<p><strong>Definition in CtpDescription.ts:</strong></p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="typescript"><code><span className="line"><span style={{ color: "#E6EDF3" }}>{"{"}</span></span>
<span className="line"><span style={{ color: "#FFA657" }}>  displayName</span><span style={{ color: "#E6EDF3" }}>: </span><span style={{ color: "#A5D6FF" }}>'Post Type Name or ID'</span><span style={{ color: "#E6EDF3" }}>,</span></span>
<span className="line"><span style={{ color: "#FFA657" }}>  name</span><span style={{ color: "#E6EDF3" }}>: </span><span style={{ color: "#A5D6FF" }}>'postType'</span><span style={{ color: "#E6EDF3" }}>,</span></span>
<span className="line"><span style={{ color: "#FFA657" }}>  type</span><span style={{ color: "#E6EDF3" }}>: </span><span style={{ color: "#A5D6FF" }}>'options'</span><span style={{ color: "#E6EDF3" }}>,</span></span>
<span className="line"><span style={{ color: "#FFA657" }}>  typeOptions</span><span style={{ color: "#E6EDF3" }}>: {"{"}</span></span>
<span className="line"><span style={{ color: "#FFA657" }}>    loadOptionsMethod</span><span style={{ color: "#E6EDF3" }}>: </span><span style={{ color: "#A5D6FF" }}>'getPostTypes'</span><span style={{ color: "#E6EDF3" }}>,</span></span>
<span className="line"><span style={{ color: "#E6EDF3" }}>  {"}"},</span></span>
<span className="line"><span style={{ color: "#FFA657" }}>  required</span><span style={{ color: "#E6EDF3" }}>: </span><span style={{ color: "#79C0FF" }}>true</span><span style={{ color: "#E6EDF3" }}>,</span></span>
<span className="line"><span style={{ color: "#FF7B72" }}>  default</span><span style={{ color: "#E6EDF3" }}>: </span><span style={{ color: "#A5D6FF" }}>''</span><span style={{ color: "#E6EDF3" }}>,</span></span>
<span className="line"><span style={{ color: "#FFA657" }}>  description</span><span style={{ color: "#E6EDF3" }}>: </span><span style={{ color: "#A5D6FF" }}>'The post type to work with (post, page, or any custom post type). Choose from the list, or specify an ID using an &lt;a href="https://docs.n8n.io/code/expressions/"&gt;expression&lt;/a&gt;.'</span><span style={{ color: "#E6EDF3" }}>,</span></span>
<span className="line"><span style={{ color: "#E6EDF3" }}>{"}"}</span></span></code></pre>
<p><strong>Method implementation in WordpressCpt.node.ts:</strong></p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="typescript"><code><span className="line"><span style={{ color: "#E6EDF3" }}>async </span><span style={{ color: "#D2A8FF" }}>getPostTypes</span><span style={{ color: "#E6EDF3" }}>(</span><span style={{ color: "#79C0FF" }}>this</span><span style={{ color: "#E6EDF3" }}>: ILoadOptionsFunctions): </span><span style={{ color: "#79C0FF" }}>Promise</span><span style={{ color: "#FF7B72" }}>&lt;</span><span style={{ color: "#E6EDF3" }}>INodePropertyOptions[]</span><span style={{ color: "#FF7B72" }}>&gt;</span><span style={{ color: "#E6EDF3" }}> {"{"}</span></span>
<span className="line"><span style={{ color: "#E6EDF3" }}>  const returnData: INodePropertyOptions[] </span><span style={{ color: "#FF7B72" }}>=</span><span style={{ color: "#E6EDF3" }}> [];</span></span>
<span className="line"><span style={{ color: "#E6EDF3" }}>  const types </span><span style={{ color: "#FF7B72" }}>=</span><span style={{ color: "#FF7B72" }}> await</span><span style={{ color: "#E6EDF3" }}> wordpressApiRequest.</span><span style={{ color: "#D2A8FF" }}>call</span><span style={{ color: "#E6EDF3" }}>(</span><span style={{ color: "#79C0FF" }}>this</span><span style={{ color: "#E6EDF3" }}>, </span><span style={{ color: "#A5D6FF" }}>'GET'</span><span style={{ color: "#E6EDF3" }}>, </span><span style={{ color: "#A5D6FF" }}>'/types'</span><span style={{ color: "#E6EDF3" }}>, {"{"}{"}"});</span></span>
<span className="line"><span style={{ color: "#E6EDF3" }}>  </span></span>
<span className="line"><span style={{ color: "#D2A8FF" }}>  for</span><span style={{ color: "#E6EDF3" }}> (const [_, type] </span><span style={{ color: "#FF7B72" }}>of</span><span style={{ color: "#E6EDF3" }}> Object.</span><span style={{ color: "#D2A8FF" }}>entries</span><span style={{ color: "#E6EDF3" }}>(types)) {"{"}</span></span>
<span className="line"><span style={{ color: "#E6EDF3" }}>    const {"{"} </span><span style={{ color: "#FFA657" }}>name</span><span style={{ color: "#E6EDF3" }}>: typeName, </span><span style={{ color: "#FFA657" }}>rest_base</span><span style={{ color: "#E6EDF3" }}>: typeRestBase {"}"} = type </span><span style={{ color: "#FF7B72" }}>as</span><span style={{ color: "#E6EDF3" }}> {"{"} </span><span style={{ color: "#FFA657" }}>name</span><span style={{ color: "#FF7B72" }}>:</span><span style={{ color: "#79C0FF" }}> string</span><span style={{ color: "#E6EDF3" }}>; </span><span style={{ color: "#FFA657" }}>rest_base</span><span style={{ color: "#FF7B72" }}>:</span><span style={{ color: "#79C0FF" }}> string</span><span style={{ color: "#E6EDF3" }}> {"}"};</span></span>
<span className="line"></span>
<span className="line"><span style={{ color: "#E6EDF3" }}>    returnData.push({"{"}</span></span>
<span className="line"><span style={{ color: "#FFA657" }}>      name</span><span style={{ color: "#E6EDF3" }}>: typeName,</span></span>
<span className="line"><span style={{ color: "#FFA657" }}>      value</span><span style={{ color: "#E6EDF3" }}>: typeRestBase,</span></span>
<span className="line"><span style={{ color: "#E6EDF3" }}>    {"}"});</span></span>
<span className="line"><span style={{ color: "#E6EDF3" }}>  {"}"}</span></span>
<span className="line"><span style={{ color: "#E6EDF3" }}>  </span></span>
<span className="line"><span style={{ color: "#E6EDF3" }}>  return returnData;</span></span>
<span className="line"><span style={{ color: "#E6EDF3" }}>{"}"}</span></span></code></pre>
<h3 id="dynamic-endpoint-management">Dynamic Endpoint Management</h3>
<p>The <code>types</code> endpoint returns a JSON object with all post_types configured in the WordPress installation. For the option <code>value</code>, we use the <code>rest_base</code> property, which will provide the endpoint on which the various methods will operate.</p>
<p>API calls are handled by two functions in <strong>GenericFunctions.ts</strong>:</p>
<ul>
<li><code>wordpressApiRequest</code></li>
<li><code>wordpressApiRequestAllItems</code></li>
</ul>
<h3 id="key-difference">Key Difference</h3>
<p>The difference compared to the official WordPress node is the way endpoints are managed, which are no longer hardcoded but are provided by the <code>postType</code> property we defined above.</p>
<p>For example, the <code>getAll</code> method calls the endpoint passing the <code>postType</code> variable, thus allowing dynamic work with any Custom Post Type present in the WordPress installation.</p>
<h2 id="solution-advantages">Solution Advantages</h2>
<h3 id="1-total-flexibility">1. Total Flexibility</h3>
<ul>
<li>Automatic support for all Custom Post Types</li>
<li>Familiar interface for official WordPress node users</li>
<li>No manual endpoint configuration</li>
</ul>
<h3 id="2-automatic-pagination-management">2. Automatic Pagination Management</h3>
<ul>
<li>“Return All” flag to retrieve all content</li>
<li>Transparent management of 100-element per request limits</li>
<li>No manual loop needed in the workflow</li>
</ul>
<h3 id="3-improved-user-experience">3. Improved User Experience</h3>
<ul>
<li>Dynamic dropdown with all available post types</li>
<li>Same usage pattern as the official node</li>
<li>Integrated authentication management</li>
</ul>
<h2 id="results">Results</h2>
<p>The custom node allowed to:</p>
<ul>
<li><strong>Eliminate workarounds</strong> with HTTP Request</li>
<li><strong>Significantly reduce</strong> chatbot development times</li>
<li><strong>Handle thousands of custom content</strong> without manual interventions</li>
<li><strong>Maintain consistency</strong> with the existing n8n ecosystem</li>
</ul>
<h2 id="how-to-test-the-node">How to Test the Node</h2>
<p>To test the node on an n8n installation:</p>
<ol>
<li>Clone the repository</li>
<li>Install dependencies: <code>npm install</code></li>
<li>Build: <code>npm run build</code></li>
<li>Link the package: <code>npm link</code></li>
<li>Inside the <code>~/.n8n/custom</code> folder (create it if it doesn’t exist), run: <code>npm link n8n-nodes-wordpress-cpt</code></li>
</ol>
<h2 id="screenshot">Screenshot</h2>
<p><img alt="Wordpress new node in action" loading="lazy" decoding="async" width="1854" height="946" src="/_astro/wordpress-cpt-full.DpJpwWnt_19WmsQ.webp" /></p>
<h2 id="conclusions">Conclusions</h2>
<p>The development of this custom node demonstrates how it’s possible to extend n8n for specific use cases, starting from work already done by the community and adding missing functionalities.</p>
<p>The keys to success were:</p>
<ol>
<li><strong>Intelligent reuse</strong> of existing code</li>
<li><strong>Incremental approach</strong> starting from identified limitations</li>
<li><strong>Focus on user experience</strong> maintaining familiar patterns</li>
<li><strong>Dynamic endpoint management</strong> instead of hardcoded solutions</li>
</ol>
<p>For those who frequently work with Custom Post Types in WordPress, this approach offers a robust and scalable solution that integrates perfectly into the n8n ecosystem.</p>
<h2 id="resources">Resources</h2>
<ul>
<li><a href="https://github.com/lupin72/n8n-wordress-custom-node#:~:text=Settings-,n8n%2Dwordress%2Dcustom%2Dnode,-Public" target="_blank" rel="noopener">github repository for this node</a></li>
<li><a href="https://docs.n8n.io/integrations/creating-nodes/overview/" target="_blank" rel="noopener">n8n Documentation - How to create a custom node</a></li>
<li><a href="https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.wordpress/" target="_blank" rel="noopener">Wordpress node documentation</a></li>
</ul>
</div></div><footer className="article__foot grid-12" data-astro-cid-zg7dkzxc><div className="author" data-astro-cid-zg7dkzxc><p className="note" data-astro-cid-zg7dkzxc>Written by</p><p className="h3" data-astro-cid-zg7dkzxc>Thanzeer J</p><p className="author__bio" data-astro-cid-zg7dkzxc>Full-Stack Developer &amp; Software Developer based in Kerala, India. Building modern web and mobile applications.</p><a href="/contact" className="btn" data-astro-cid-zg7dkzxc>Work with me <span className="arrow" data-astro-cid-zg7dkzxc>→</span></a></div><a href="/how-to-buld-a-desktop-kubernetescluster-with-turing-pi2-part-2" className="next" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>Next post · Dev</span><span className="h2 next__title" data-astro-cid-zg7dkzxc>How to Build a Desktop Kubernetes Cluster with Turing Pi 2 - part 2</span></a></footer></article>
    </>
  );
}
