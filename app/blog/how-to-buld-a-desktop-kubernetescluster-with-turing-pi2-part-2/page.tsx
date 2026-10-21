import type { Metadata } from "next";
import type React from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Build a Desktop Kubernetes Cluster with Turing Pi 2 - part 2 | Thanzeer J",
  description: "Learn how to configure a lightweight Kubernetes cluster on Turing Pi 2 with Raspberry Pi CM4 using K3s, Helm, MetalLB, ArgoCD, Prometheus, Grafana, and NFS. Step-by-step guide for a complete bare-metal setup.",
};

export default function Page_blog_how_to_buld_a_desktop_kubernetescluster_with_turing_pi2_part_2() {
  return (
    <>
<article className="article wrap" data-astro-cid-zg7dkzxc><header className="article__head" data-astro-cid-zg7dkzxc><nav className="note crumbs" aria-label="Breadcrumb" data-astro-cid-zg7dkzxc><a href="/" className="link" data-astro-cid-zg7dkzxc>Home</a> / <a href="/" className="link" data-astro-cid-zg7dkzxc>Blog</a> / <a href="/topic/dev" className="link note--ink" data-astro-cid-zg7dkzxc>Dev</a></nav><h1 className="h1 article__title" data-astro-cid-zg7dkzxc>How to Build a Desktop Kubernetes Cluster with Turing Pi 2 - part 2</h1><p className="lead article__desc" data-astro-cid-zg7dkzxc>Learn how to configure a lightweight Kubernetes cluster on Turing Pi 2 with Raspberry Pi CM4 using K3s, Helm, MetalLB, ArgoCD, Prometheus, Grafana, and NFS. Step-by-step guide for a complete bare-metal setup.</p><dl className="article__meta grid-12" data-astro-cid-zg7dkzxc><div data-astro-cid-zg7dkzxc><dt className="note" data-astro-cid-zg7dkzxc>Pillar</dt><dd data-astro-cid-zg7dkzxc>Dev</dd></div><div data-astro-cid-zg7dkzxc><dt className="note" data-astro-cid-zg7dkzxc>Published</dt><dd data-astro-cid-zg7dkzxc>21 Apr 2025</dd></div><div data-astro-cid-zg7dkzxc><dt className="note" data-astro-cid-zg7dkzxc>Reading</dt><dd data-astro-cid-zg7dkzxc>10 min</dd></div><div data-astro-cid-zg7dkzxc><dt className="note" data-astro-cid-zg7dkzxc>Words</dt><dd data-astro-cid-zg7dkzxc>2,031</dd></div></dl></header><figure className="article__cover" data-astro-cid-zg7dkzxc><img src="/_astro/grafana.PqHmfW_e_1e755.webp" srcSet="/_astro/grafana.PqHmfW_e_Z1WtrLq.webp 640w, /_astro/grafana.PqHmfW_e_1hzL7s.webp 1024w, /_astro/grafana.PqHmfW_e_1lulBg.webp 1600w" alt="Turing PI2 Mini ITS" sizes="(min-width: 1024px) 80vw, 100vw" loading="eager" fetchPriority="high" data-astro-cid-zg7dkzxc="true" decoding="async" width="1612" height="825" /><figcaption className="note" data-astro-cid-zg7dkzxc>fig. 00 · Turing PI2 Mini ITS</figcaption></figure><div className="article__body grid-12" data-astro-cid-zg7dkzxc><aside className="toc" data-astro-cid-zg7dkzxc><p className="note note--ink" data-astro-cid-zg7dkzxc>Contents</p><ol data-astro-cid-zg7dkzxc><li data-astro-cid-zg7dkzxc><a href="/index.html#introduction" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>01</span> Introduction</a></li><li data-astro-cid-zg7dkzxc><a href="/index.html#objectives" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>02</span> Objectives</a></li><li data-astro-cid-zg7dkzxc><a href="/index.html#prerequisites" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>03</span> Prerequisites</a></li><li data-astro-cid-zg7dkzxc><a href="/index.html#installing-kubernetes-with-k3s" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>04</span> Installing Kubernetes with K3s</a></li><li data-astro-cid-zg7dkzxc><a href="/index.html#installing-helm" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>05</span> Installing Helm</a></li><li data-astro-cid-zg7dkzxc><a href="/index.html#networking-with-metallb" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>06</span> Networking with MetalLB</a></li><li data-astro-cid-zg7dkzxc><a href="/index.html#storage-configuration-with-nfs" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>07</span> Storage Configuration with NFS</a></li><li data-astro-cid-zg7dkzxc><a href="/index.html#installing-the-nfs-storageclass" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>08</span> Installing the NFS StorageClass</a></li><li data-astro-cid-zg7dkzxc><a href="/index.html#installing-argocd" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>09</span> Installing ArgoCD</a></li><li data-astro-cid-zg7dkzxc><a href="/index.html#installing-prometheus-and-grafana" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>10</span> Installing Prometheus and Grafana</a></li><li data-astro-cid-zg7dkzxc><a href="/index.html#creating-monitoring-dashboards" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>11</span> Creating Monitoring Dashboards</a></li><li data-astro-cid-zg7dkzxc><a href="/index.html#" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>12</span> </a></li><li data-astro-cid-zg7dkzxc><a href="/index.html#conclusion" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>13</span> Conclusion</a></li></ol></aside><div className="prose" data-astro-cid-zg7dkzxc><h2 id="introduction">Introduction</h2>
<p>In the <a href="/how-to-buld-a-desktop-kubernetescluster-with-turing-pi2-part-1">first part</a> of this article, we covered how to assemble the hardware of our Kubernetes cluster using a Turing Pi 2 board with 4 Raspberry Pi Compute Module 4 units. We installed DietPi as the operating system on each node and connected an SSD to node 3 via the SATA port.</p>
<p>If you’ve followed all the steps from Part 1, you should now have:</p>
<ul>
<li>The BMC active and configured</li>
<li>All 4 nodes accessible via SSH</li>
<li>A physical cluster ready to host the software infrastructure</li>
</ul>
<p>In this second part, we will focus on configuring the Kubernetes cluster, starting with the installation of K3s and integrating essential tools for management, monitoring, and application deployment.</p>
<h2 id="objectives">Objectives</h2>
<p>In this second part, we’ll focus on configuring the software environment of our cluster. The goal is to create a complete, functional Kubernetes cluster ready to manage applications in a modern and modular way.</p>
<p>Specifically, we will:</p>
<ul>
<li>Install K3s to set up a lightweight and efficient Kubernetes cluster</li>
<li>Install and configure Helm, the package manager for Kubernetes</li>
<li>Set up MetalLB as a load balancer to assign public IPs in the cluster</li>
<li>Install ArgoCD to manage GitOps-based application deployment</li>
<li>Integrate Prometheus for cluster monitoring</li>
<li>Add Grafana to visualize metrics through dashboards</li>
</ul>
<p>At the end of this guide, your cluster will be ready to manage production-grade applications (or nearly 😄), and you’ll be able to start experimenting with the Kubernetes ecosystem.</p>
<h2 id="prerequisites">Prerequisites</h2>
<p>Before installing the Kubernetes cluster, we need to complete some system configurations on each node.</p>
<h3 id="enable-cgroups">Enable cgroups</h3>
<p>To allow Kubernetes (and thus K3s) to function correctly, you need to enable cgroups in the kernel.</p>
<ol>
<li>
<p>SSH into each node.</p>
</li>
<li>
<p>Edit the file <code>/boot/cmdline.txt</code> by adding the following to the end of the line (everything must stay on one line):</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>cgroup_enable=cpuset cgroup_enable=memory cgroup_memory=1</span></span></code></pre>
</li>
<li>
<p>Reboot each node to apply the change. If you’re using BMC with the <code>tpi</code> tool, you can do:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>tpi power off -n 1</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>tpi power on -n 1</span></span></code></pre>
<p>Repeat for each node (<code>-n 2</code>, <code>-n 3</code>, etc.).</p>
</li>
</ol>
<h3 id="set-hostnames">Set Hostnames</h3>
<p>Assign a unique hostname to each node. I chose the following names:</p>
<ul>
<li>cube01</li>
<li>cube02</li>
<li>cube03</li>
<li>cube04</li>
</ul>
<p>You can change them via:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>dietpi-config &gt; Security Options &gt; Hostname</span></span></code></pre>
<h3 id="update-the-operating-system">Update the Operating System</h3>
<p>On each node, run:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>apt update</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>apt upgrade</span></span></code></pre>
<h3 id="configure-etchosts">Configure <code>/etc/hosts</code></h3>
<p>Update the <code>/etc/hosts</code> file on each node with the static IPs and assigned hostnames. This allows you to use hostnames instead of IP addresses.</p>
<p>Example:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="plaintext"><code><span className="line"><span>192.168.1.178 cube01</span></span>
<span className="line"><span>192.168.1.180 cube02</span></span>
<span className="line"><span>192.168.1.177 cube03</span></span>
<span className="line"><span>192.168.1.187 cube04</span></span></code></pre>
<h3 id="install-a-basic-firewall">Install a Basic Firewall</h3>
<p>Install a basic firewall (iptables) on each node:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>apt -y install iptables</span></span></code></pre>
<h2 id="installing-kubernetes-with-k3s">Installing Kubernetes with K3s</h2>
<p>To install Kubernetes, we’ll use K3s, a lightweight distribution designed for resource-constrained environments like Raspberry Pi, but without sacrificing core Kubernetes functionality.</p>
<h3 id="control-plane-installation">Control Plane Installation</h3>
<p>On node <code>cube01</code> (or the one you’ve chosen as master), run:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>curl -sfL https://get.k3s.io | sh -s - \</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>  --write-kubeconfig-mode 644 \</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>  --disable servicelb \</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>  --token myrandompassword \</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>  --node-ip 192.168.1.178 \</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>  --disable-cloud-controller \</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>  --disable local-storage</span></span></code></pre>
<p><strong>Note</strong>: Replace <code>myrandompassword</code> with a secure token and save it: you’ll need it to join other nodes.</p>
<p><strong>Explanation of options</strong>:</p>
<ul>
<li><code>--write-kubeconfig-mode 644</code>: makes the kubeconfig file readable by other users (e.g., Rancher)</li>
<li><code>--disable servicelb</code>: disables the built-in service load balancer as we’ll use MetalLB</li>
<li><code>--token</code>: custom token to allow other nodes to join the cluster</li>
<li><code>--node-ip</code>: local IP of the node (adjust to your setup)</li>
<li><code>--disable-cloud-controller</code>: disables the cloud controller, not needed in bare-metal setups</li>
<li><code>--disable local-storage</code>: disables K3s local storage, since we’ll use NFS instead</li>
</ul>
<h3 id="verify">Verify</h3>
<p>After installation, verify the master node status with:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>kubectl get nodes</span></span></code></pre>
<p>Expected output:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="plaintext"><code><span className="line"><span>NAME     STATUS   ROLES                       AGE     VERSION</span></span>
<span className="line"><span>cube01   Ready    control-plane,master        6m22s   v1.25.6+k3s1</span></span></code></pre>
<h3 id="worker-node-installation">Worker Node Installation</h3>
<p>To join the other nodes (e.g., cube02, cube03, cube04) to the control plane, run this on each node:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>curl -sfL https://get.k3s.io | K3S_URL=https://192.168.1.178:6443 K3S_TOKEN=myrandompassword sh -</span></span></code></pre>
<p>Replace:</p>
<ul>
<li><code>192.168.1.178</code> with the IP of the master node</li>
<li><code>myrandompassword</code> with the token used earlier</li>
</ul>
<p>After a few seconds, you should see the nodes join the cluster. Verify from the master node:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>kubectl get nodes</span></span></code></pre>
<p>Example output:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="plaintext"><code><span className="line"><span>NAME     STATUS   ROLES                       AGE     VERSION</span></span>
<span className="line"><span>cube01   Ready    control-plane,master        10m     v1.25.6+k3s1</span></span>
<span className="line"><span>cube02   Ready    &lt;none&gt;                      2m      v1.25.6+k3s1</span></span>
<span className="line"><span>cube03   Ready    &lt;none&gt;                      2m      v1.25.6+k3s1</span></span>
<span className="line"><span>cube04   Ready    &lt;none&gt;                      1m      v1.25.6+k3s1</span></span></code></pre>
<h3 id="label-the-nodes">Label the Nodes</h3>
<p>Optional but recommended: labeling nodes allows Kubernetes to assign custom roles, enabling better workload distribution.</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>kubectl label nodes cube01 kubernetes.io/role=worker</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>kubectl label nodes cube02 kubernetes.io/role=worker</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>kubectl label nodes cube03 kubernetes.io/role=worker</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>kubectl label nodes cube04 kubernetes.io/role=worker</span></span></code></pre>
<p>To verify:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>kubectl get nodes --show-labels</span></span></code></pre>
<h2 id="installing-helm">Installing Helm</h2>
<p>Helm is the go-to package manager for Kubernetes. It allows you to install, update, and manage complex applications through simple commands and configuration files called charts.</p>
<h3 id="manual-installation-on-cube01-master">Manual Installation on cube01 (master)</h3>
<ol>
<li>
<p>Install Git (required for some Helm charts):</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>apt -y install git</span></span></code></pre>
</li>
<li>
<p>Configure the kubeconfig file:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>export KUBECONFIG=~/.kube/config  </span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>mkdir -p ~/.kube  </span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>sudo k3s kubectl config view --raw &gt; "$KUBECONFIG"  </span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>chmod 600 "$KUBECONFIG"  </span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>echo "KUBECONFIG=$KUBECONFIG" &gt;&gt; /etc/environment</span></span></code></pre>
</li>
<li>
<p>Download and install Helm:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>cd ~</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>mkdir helm</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>cd helm</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>chmod 700 get_helm.sh</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>./get_helm.sh</span></span></code></pre>
</li>
<li>
<p>Verify the installation:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>helm version</span></span></code></pre>
</li>
</ol>
<hr />
<h2 id="networking-with-metallb">Networking with MetalLB</h2>
<p>MetalLB is a load balancer for bare-metal environments, allowing you to expose Kubernetes services using assignable IP addresses in your local network. It’s essential if you want to access your services externally without a cloud provider.</p>
<h3 id="installing-metallb">Installing MetalLB</h3>
<p>On the master node (<code>cube01</code>):</p>
<ol>
<li>
<p>Add the MetalLB Helm repository:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>helm repo add metallb https://metallb.github.io/metallb</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>helm repo update</span></span></code></pre>
</li>
<li>
<p>Confirm the chart is available:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>helm search repo metallb</span></span></code></pre>
</li>
<li>
<p>Install MetalLB:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>helm upgrade --install metallb metallb/metallb --create-namespace \</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>  --namespace metallb-system --wait</span></span></code></pre>
</li>
</ol>
<h3 id="configure-the-ip-address-pool">Configure the IP Address Pool</h3>
<p>Assign an IP range for MetalLB to use. Adjust based on your network setup and make sure these IPs are not used by other devices.</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="yaml"><code><span className="line"><span style={{ color: "#A5D6FF" }}>cat &lt;&lt; 'EOF' | kubectl apply -f -</span></span>
<span className="line"><span style={{ color: "#7EE787" }}>apiVersion</span><span style={{ color: "#E6EDF3" }}>: </span><span style={{ color: "#A5D6FF" }}>metallb.io/v1beta1</span></span>
<span className="line"><span style={{ color: "#7EE787" }}>kind</span><span style={{ color: "#E6EDF3" }}>: </span><span style={{ color: "#A5D6FF" }}>IPAddressPool</span></span>
<span className="line"><span style={{ color: "#7EE787" }}>metadata</span><span style={{ color: "#E6EDF3" }}>:</span></span>
<span className="line"><span style={{ color: "#7EE787" }}>  name</span><span style={{ color: "#E6EDF3" }}>: </span><span style={{ color: "#A5D6FF" }}>default-pool</span></span>
<span className="line"><span style={{ color: "#7EE787" }}>  namespace</span><span style={{ color: "#E6EDF3" }}>: </span><span style={{ color: "#A5D6FF" }}>metallb-system</span></span>
<span className="line"><span style={{ color: "#7EE787" }}>spec</span><span style={{ color: "#E6EDF3" }}>:</span></span>
<span className="line"><span style={{ color: "#7EE787" }}>  addresses</span><span style={{ color: "#E6EDF3" }}>:</span></span>
<span className="line"><span style={{ color: "#E6EDF3" }}>  - </span><span style={{ color: "#A5D6FF" }}>192.168.1.240-192.168.1.250</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>---</span></span>
<span className="line"><span style={{ color: "#7EE787" }}>apiVersion</span><span style={{ color: "#E6EDF3" }}>: </span><span style={{ color: "#A5D6FF" }}>metallb.io/v1beta1</span></span>
<span className="line"><span style={{ color: "#7EE787" }}>kind</span><span style={{ color: "#E6EDF3" }}>: </span><span style={{ color: "#A5D6FF" }}>L2Advertisement</span></span>
<span className="line"><span style={{ color: "#7EE787" }}>metadata</span><span style={{ color: "#E6EDF3" }}>:</span></span>
<span className="line"><span style={{ color: "#7EE787" }}>  name</span><span style={{ color: "#E6EDF3" }}>: </span><span style={{ color: "#A5D6FF" }}>default</span></span>
<span className="line"><span style={{ color: "#7EE787" }}>  namespace</span><span style={{ color: "#E6EDF3" }}>: </span><span style={{ color: "#A5D6FF" }}>metallb-system</span></span>
<span className="line"><span style={{ color: "#7EE787" }}>spec</span><span style={{ color: "#E6EDF3" }}>:</span></span>
<span className="line"><span style={{ color: "#7EE787" }}>  ipAddressPools</span><span style={{ color: "#E6EDF3" }}>:</span></span>
<span className="line"><span style={{ color: "#E6EDF3" }}>  - </span><span style={{ color: "#A5D6FF" }}>default-pool</span></span>
<span className="line"><span style={{ color: "#A5D6FF" }}>EOF</span></span></code></pre>
<h3 id="verify-1">Verify</h3>
<p>You should see:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="plaintext"><code><span className="line"><span>ipaddresspool.metallb.io/default-pool created</span></span>
<span className="line"><span>l2advertisement.metallb.io/default created</span></span></code></pre>
<hr />
<h2 id="storage-configuration-with-nfs">Storage Configuration with NFS</h2>
<p>To handle persistent storage in the cluster, this setup uses an NFS server based on an SSD connected to the SATA port on node 3 (<code>cube03</code>). This allows you to centralize shared volumes for use in Kubernetes pods.</p>
<h3 id="identify-the-disk">Identify the Disk</h3>
<p>SSH into <code>cube03</code> and run:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>fdisk -l</span></span></code></pre>
<p>Example output:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="plaintext"><code><span className="line"><span>Disk /dev/sda: 931.51 GiB, 1000204886016 bytes, 1953525168 sectors</span></span>
<span className="line"><span>Disk model: CT1000BX500SSD1</span></span></code></pre>
<h3 id="format-and-mount-the-disk">Format and Mount the Disk</h3>
<p>Format the disk as ext4:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>mkfs.ext4 /dev/sda</span></span></code></pre>
<p>Create a mount point and configure automatic mounting:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>mkdir /data</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>echo "/dev/sda /data ext4 defaults 0 0" | tee -a /etc/fstab</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>mount -a</span></span></code></pre>
<p>Verify the mount:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>df -h /data</span></span></code></pre>
<h3 id="install-and-configure-the-nfs-server">Install and Configure the NFS Server</h3>
<p>Install the NFS server package:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>apt install -y nfs-server</span></span></code></pre>
<p>Export the <code>/data</code> directory:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>echo "/data *(rw,no_subtree_check,no_root_squash)" | tee -a /etc/exports</span></span></code></pre>
<p>Enable and start the NFS service:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>systemctl enable --now nfs-server</span></span></code></pre>
<p>Reload and re-export:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>exportfs -ar</span></span></code></pre>
<p>Verify:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>showmount -e localhost</span></span></code></pre>
<h3 id="install-the-nfs-client-on-other-nodes">Install the NFS Client on Other Nodes</h3>
<p>On nodes <code>cube01</code>, <code>cube02</code>, and <code>cube04</code>:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>apt install -y nfs-common</span></span></code></pre>
<p>Your cluster can now use <code>/data</code> as shared storage via NFS.</p>
<h2 id="installing-the-nfs-storageclass">Installing the NFS StorageClass</h2>
<p>In Kubernetes, a StorageClass defines the type of storage that can be dynamically provisioned for pods. It is an abstraction layer that allows the creation of Persistent Volumes (PV) automatically when an application requests a Persistent Volume Claim (PVC).</p>
<h3 id="key-concepts">Key Concepts</h3>
<ul>
<li><strong>Persistent Volume (PV)</strong>: a portion of storage in the cluster, either statically or dynamically provisioned.</li>
<li><strong>Persistent Volume Claim (PVC)</strong>: a request by an application for a specific type and amount of storage.</li>
<li><strong>StorageClass</strong>: defines how a PV should be created based on a PVC request.</li>
</ul>
<p>Relationship:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="plaintext"><code><span className="line"><span>PVC ➜ requests storage ➜ StorageClass ➜ defines how it's created ➜ PV ➜ is assigned</span></span></code></pre>
<h3 id="the-provisioner-nfs-subdir-external-provisioner">The Provisioner: nfs-subdir-external-provisioner</h3>
<p>To use NFS in our cluster, we’ll install the <code>nfs-subdir-external-provisioner</code>, a controller that automatically manages subfolders in an NFS export for each PVC request.</p>
<h3 id="install-via-helm">Install via Helm</h3>
<p>Run on the master node (<code>cube01</code>):</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>helm repo add nfs-subdir-external-provisioner https://kubernetes-sigs.github.io/nfs-subdir-external-provisioner/</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>helm repo update</span></span>
<span className="line"></span>
<span className="line"><span style={{ color: "#79C0FF" }}>helm install nfs-subdir-external-provisioner nfs-subdir-external-provisioner/nfs-subdir-external-provisioner \</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>  --set nfs.server=192.168.1.177 \</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>  --set nfs.path=/data \</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>  --create-namespace \</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>  --namespace nfs-system</span></span></code></pre>
<h3 id="verify-the-storageclass">Verify the StorageClass</h3>
<p>After installation, verify:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>kubectl get storageclass</span></span></code></pre>
<p>Example output:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="plaintext"><code><span className="line"><span>NAME           PROVISIONER                                  RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE</span></span>
<span className="line"><span>nfs-client     cluster.local/nfs-subdir-external-provisioner   Delete          Immediate           true                  10m</span></span></code></pre>
<hr />
<h2 id="installing-argocd">Installing ArgoCD</h2>
<p>ArgoCD is a DevOps tool for Kubernetes that enables the GitOps model: applications are defined as code in a Git repository and ArgoCD automatically syncs and deploys them in the cluster.</p>
<p><img alt="ArgoCD" loading="lazy" decoding="async" width="1243" height="966" src="/_astro/argocd.Cv0FpG15_Z8JOOY.webp" /></p>
<h3 id="installation">Installation</h3>
<p>Run on the master node (<code>cube01</code>):</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>kubectl create namespace argocd</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml</span></span></code></pre>
<p>Wait until all pods are in Running state:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>kubectl get pods -n argocd</span></span></code></pre>
<p>Expected output:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="plaintext"><code><span className="line"><span>NAME                                             READY   STATUS    RESTARTS   AGE</span></span>
<span className="line"><span>argocd-application-controller-0                  1/1     Running   0          3d</span></span>
<span className="line"><span>argocd-applicationset-controller-xxx             1/1     Running   0          3d</span></span>
<span className="line"><span>argocd-dex-server-xxx                            1/1     Running   0          3d</span></span>
<span className="line"><span>argocd-notifications-controller-xxx              1/1     Running   0          3d</span></span>
<span className="line"><span>argocd-redis-xxx                                 1/1     Running   0          3d</span></span>
<span className="line"><span>argocd-repo-server-xxx                           1/1     Running   0          3d</span></span>
<span className="line"><span>argocd-server-xxx                                1/1     Running   0          3d</span></span></code></pre>
<h3 id="retrieve-the-login-password">Retrieve the Login Password</h3>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{"{"}.data.password{"}"}" | base64 -d; echo</span></span></code></pre>
<h3 id="accessing-the-ui-via-metallb">Accessing the UI via MetalLB</h3>
<p>Expose ArgoCD’s web interface using a LoadBalancer:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>kubectl patch service argocd-server -n argocd --patch '{"{"} "spec": {"{"} "type": "LoadBalancer", "loadBalancerIP": "192.168.1.242" {"}"} {"}"}'</span></span></code></pre>
<p>Check:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>kubectl get svc -n argocd</span></span></code></pre>
<hr />
<h2 id="installing-prometheus-and-grafana">Installing Prometheus and Grafana</h2>
<p>Prometheus is a monitoring and alerting system developed by SoundCloud and now part of the CNCF. It is designed to collect metrics from cloud-native environments like Kubernetes.</p>
<p>Grafana, integrated into this stack, enables visualization of metrics via interactive, customizable dashboards.</p>
<h3 id="installation-1">Installation</h3>
<p>On the master node (<code>cube01</code>), run:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>helm repo add prometheus-community https://prometheus-community.github.io/helm-charts</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>helm repo update</span></span>
<span className="line"></span>
<span className="line"><span style={{ color: "#79C0FF" }}>helm install prometheus prometheus-community/kube-prometheus-stack \</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>  --namespace monitoring \</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>  --create-namespace \</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>  --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.storageClassName=nfs-client \</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>  --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.resources.requests.storage=2Gi \</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>  --set grafana.persistence.enabled=true \</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>  --set grafana.persistence.storageClassName=nfs-client \</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>  --set grafana.persistence.size=2Gi</span></span></code></pre>
<h3 id="verify-2">Verify</h3>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>kubectl get pods -n monitoring</span></span></code></pre>
<h3 id="retrieve-grafana-admin-password">Retrieve Grafana Admin Password</h3>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>kubectl get secret --namespace monitoring prometheus-grafana -o jsonpath="{"{"}.data.admin-password{"}"}" | base64 -d; echo</span></span></code></pre>
<h3 id="accessing-grafana-via-metallb">Accessing Grafana via MetalLB</h3>
<p>Expose Grafana via a LoadBalancer IP:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>kubectl patch svc prometheus-grafana -n monitoring \</span></span>
<span className="line"><span style={{ color: "#79C0FF" }}>  --patch '{"{"} "spec": {"{"} "type": "LoadBalancer", "loadBalancerIP": "192.168.1.243" {"}"} {"}"}'</span></span></code></pre>
<p>Check:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="console"><code><span className="line"><span style={{ color: "#79C0FF" }}>kubectl get svc -n monitoring</span></span></code></pre>
<hr />
<h2 id="creating-monitoring-dashboards">Creating Monitoring Dashboards</h2>
<ol>
<li>Log in to the Grafana web UI</li>
<li>Enter the admin credentials and change the password if prompted</li>
</ol>
<h3 id="add-prometheus-as-a-data-source">Add Prometheus as a Data Source</h3>
<p>Go to: <strong>Connections → Data sources</strong> and add a new source:</p>
<ul>
<li>Type: Prometheus</li>
<li>URL: <a href="http://prometheus-kube-prometheus-prometheus.monitoring.svc.cluster.local:9090" target="_blank" rel="noopener">http://prometheus-kube-prometheus-prometheus.monitoring.svc.cluster.local:9090</a></li>
</ul>
<p>Click Save &amp; Test.</p>
<h3 id="import-preconfigured-dashboards">Import Preconfigured Dashboards</h3>
<p><strong>Node Monitoring Dashboard</strong><br />
Go to: <strong>Dashboard → New → Import</strong> and enter the ID: <code>1860</code></p>
<p><strong>K3s Cluster Monitoring Dashboard</strong><br />
Import using ID: <code>15282</code></p>
<p>You now have full visibility into CPU, RAM, storage, traffic, and cluster health directly from Grafana.</p>
<h2 id=""><img alt="Grafana" loading="lazy" decoding="async" width="1612" height="825" src="/_astro/grafana.PqHmfW_e_1e755.webp" /></h2>
<h2 id="conclusion">Conclusion</h2>
<p>At this point, your Kubernetes cluster based on Turing Pi 2 and Raspberry Pi CM4 is complete and fully operational, with all essential components for modern application management:</p>
<ul>
<li>K3s as a lightweight and reliable Kubernetes distribution</li>
<li>Helm to simplify installation and management of services</li>
<li>MetalLB for exposing services in bare-metal environments</li>
<li>NFS as shared persistent storage</li>
<li>ArgoCD for GitOps-based application deployment</li>
<li>Prometheus and Grafana for monitoring and visualizing metrics</li>
</ul>
<p>This setup provides a solid foundation to experiment with Kubernetes, automate application delivery, monitor system health, and easily scale new features.</p>
<hr />
<h3 id="references">References</h3>
<ul>
<li><a href="https://docs.turingpi.com/docs/turing-pi2-kubernetes-installation" target="_blank" rel="noopener">TuringPi</a></li>
<li><a href="https://k3s.io/" target="_blank" rel="noopener">K3s</a></li>
<li><a href="https://helm.sh/" target="_blank" rel="noopener">Helm</a></li>
<li><a href="https://metallb.universe.tf/" target="_blank" rel="noopener">MetalLB</a></li>
<li><a href="https://argo-cd.readthedocs.io/" target="_blank" rel="noopener">ArgoCD</a></li>
<li><a href="https://prometheus.io/" target="_blank" rel="noopener">Prometheus</a></li>
<li><a href="https://grafana.com/" target="_blank" rel="noopener">Grafana</a></li>
<li><a href="https://github.com/kubernetes-sigs/nfs-subdir-external-provisioner" target="_blank" rel="noopener">nfs-subdir-external-provisioner</a></li>
</ul>
</div></div><footer className="article__foot grid-12" data-astro-cid-zg7dkzxc><div className="author" data-astro-cid-zg7dkzxc><p className="note" data-astro-cid-zg7dkzxc>Written by</p><p className="h3" data-astro-cid-zg7dkzxc>Thanzeer J</p><p className="author__bio" data-astro-cid-zg7dkzxc>Full-Stack Developer &amp; Software Developer based in Kerala, India. Building modern web and mobile applications.</p><a href="/contact" className="btn" data-astro-cid-zg7dkzxc>Work with me <span className="arrow" data-astro-cid-zg7dkzxc>→</span></a></div><a href="/how-to-buld-a-desktop-kubernetescluster-with-turing-pi2-part-1" className="next" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>Next post · Dev</span><span className="h2 next__title" data-astro-cid-zg7dkzxc>How to Build a Desktop Kubernetes Cluster with Turing Pi 2 - part 1</span></a></footer></article>
    </>
  );
}
