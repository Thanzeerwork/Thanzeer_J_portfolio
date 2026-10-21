import type { Metadata } from "next";
import type React from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Build a Desktop Kubernetes Cluster with Turing Pi 2 - part 1 | Thanzeer J",
  description: "Learn how to assemble a compact, low-power Kubernetes cluster at home using Turing Pi 2 and Raspberry Pi CM4. Detailed, practical and fun!",
};

export default function Page_blog_how_to_buld_a_desktop_kubernetescluster_with_turing_pi2_part_1() {
  return (
    <>
<article className="article wrap" data-astro-cid-zg7dkzxc><header className="article__head" data-astro-cid-zg7dkzxc><nav className="note crumbs" aria-label="Breadcrumb" data-astro-cid-zg7dkzxc><a href="/" className="link" data-astro-cid-zg7dkzxc>Home</a> / <a href="/" className="link" data-astro-cid-zg7dkzxc>Blog</a> / <a href="/topic/dev" className="link note--ink" data-astro-cid-zg7dkzxc>Dev</a></nav><h1 className="h1 article__title" data-astro-cid-zg7dkzxc>How to Build a Desktop Kubernetes Cluster with Turing Pi 2 - part 1</h1><p className="lead article__desc" data-astro-cid-zg7dkzxc>Learn how to assemble a compact, low-power Kubernetes cluster at home using Turing Pi 2 and Raspberry Pi CM4. Detailed, practical and fun!</p><dl className="article__meta grid-12" data-astro-cid-zg7dkzxc><div data-astro-cid-zg7dkzxc><dt className="note" data-astro-cid-zg7dkzxc>Pillar</dt><dd data-astro-cid-zg7dkzxc>Dev</dd></div><div data-astro-cid-zg7dkzxc><dt className="note" data-astro-cid-zg7dkzxc>Published</dt><dd data-astro-cid-zg7dkzxc>15 Apr 2025</dd></div><div data-astro-cid-zg7dkzxc><dt className="note" data-astro-cid-zg7dkzxc>Reading</dt><dd data-astro-cid-zg7dkzxc>7 min</dd></div><div data-astro-cid-zg7dkzxc><dt className="note" data-astro-cid-zg7dkzxc>Words</dt><dd data-astro-cid-zg7dkzxc>1,392</dd></div></dl></header><figure className="article__cover" data-astro-cid-zg7dkzxc><img src="/_astro/turing-pi2.D0p0vrG1_2fgKSn.webp" srcSet="/_astro/turing-pi2.D0p0vrG1_1ByN8B.webp 640w, /_astro/turing-pi2.D0p0vrG1_Z1W6ET6.webp 1024w, /_astro/turing-pi2.D0p0vrG1_1TWNon.webp 1600w" alt="Turing PI2 Mini ITS - Part 1" sizes="(min-width: 1024px) 80vw, 100vw" loading="eager" fetchPriority="high" data-astro-cid-zg7dkzxc="true" decoding="async" width="1900" height="1425" /><figcaption className="note" data-astro-cid-zg7dkzxc>fig. 00 · Turing PI2 Mini ITS - Part 1</figcaption></figure><div className="article__body grid-12" data-astro-cid-zg7dkzxc><aside className="toc" data-astro-cid-zg7dkzxc><p className="note note--ink" data-astro-cid-zg7dkzxc>Contents</p><ol data-astro-cid-zg7dkzxc><li data-astro-cid-zg7dkzxc><a href="/index.html#introduction" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>01</span> Introduction</a></li><li data-astro-cid-zg7dkzxc><a href="/index.html#what-i-used" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>02</span> What I used</a></li><li data-astro-cid-zg7dkzxc><a href="/index.html#assembly" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>03</span> Assembly</a></li><li data-astro-cid-zg7dkzxc><a href="/index.html#first-boot" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>04</span> First Boot</a></li><li data-astro-cid-zg7dkzxc><a href="/index.html#firmware-upgrade" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>05</span> Firmware Upgrade</a></li><li data-astro-cid-zg7dkzxc><a href="/index.html#flashing-the-nodes" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>06</span> Flashing the Nodes</a></li><li data-astro-cid-zg7dkzxc><a href="/index.html#enabling-uart" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>07</span> Enabling UART</a></li><li data-astro-cid-zg7dkzxc><a href="/index.html#serial-access-with-picocom" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>08</span> Serial Access with picocom</a></li><li data-astro-cid-zg7dkzxc><a href="/index.html#whats-next" className="link" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>09</span> What’s Next</a></li></ol></aside><div className="prose" data-astro-cid-zg7dkzxc><h2 id="introduction">Introduction</h2>
<p>Three years ago, I stumbled upon the <strong>Kickstarter</strong> campaign for the <strong>Turing Pi 2</strong>, a compact and surprisingly versatile mini cluster board. The project promised to transform a corner of my desk into a tiny home data center, with support for up to four Raspberry Pi CM4 modules, Nvidia Jetson, or Turing RK1.</p>
<p>My initial idea, which stood the test of time, was to build a Kubernetes cluster to experiment with, learn from, and maybe even have a little fun.</p>
<p>Without a clear plan, I backed the campaign anyway, and it turned out to be a huge success. After several months of waiting (between high demand and some production hiccups), the package finally arrived: a bare board inside a simple antistatic bag, protected by a shockproof box. Nothing more, nothing less: essential, as is often the case with independent hardware projects.</p>
<p>I immediately got to work gathering all the necessary components, and then came the first cold shower: the global chip shortage had made Raspberry Pis nearly impossible to find.</p>
<p>The CM4 modules, in particular, seemed to have vanished from the market. And when they were available, they were being sold at outrageous prices, often double or triple the MSRP.</p>
<p>So I shelved the project, hoping the supply situation would eventually stabilize. And as often happens in these cases, time passed, and what began with enthusiasm turned into a forgotten little item: a dusty antistatic bag left on the bookshelf.</p>
<p>Last month, while organizing, I picked up that bag and thought: now or never. So, after a couple of weeks of planning purchases (and a few more waiting for deliveries), the little beast now sits on my desk as I write this article about my assembly experience, hoping it might help another tech freak out there.</p>
<hr />
<h2 id="what-i-used">What I used</h2>
<ul>
<li>2x CM4 8GB RAM, 32GB eMMC</li>
<li>2x CM4 4GB RAM, 32GB eMMC</li>
<li>1x Mini ITX case (<a href="https://turingpi.com/product/turing-mini-itx-case/" target="_blank" rel="noopener">Turing Mini ITX</a>)</li>
<li>4x CM4 Adapters (<a href="https://turingpi.com/product/cm4-adapter/" target="_blank" rel="noopener">Turing Pi Adapter</a>)</li>
<li>4x Geekworm Aluminium Alloy Heatsink (<a href="https://www.amazon.com/Geekworm-Thickness-C235-Compatible-Motherboard/dp/B08QMTVCJW/" target="_blank" rel="noopener">Amazon</a>)</li>
<li>1x Flex ATX Power Supply (FSP Flexguru - <a href="https://www.amazon.com/FSP-Modular-gesti%C3%B3n-Cables-eficiencia/dp/B08WQ491BY?th=1" target="_blank" rel="noopener">Amazon</a>)</li>
<li>1x SSD (Crucial 1TB - <a href="https://www.amazon.com/Crucial-BX500-NAND-2-5-Inch-Internal/dp/B07YD579WM/?th=1" target="_blank" rel="noopener">Amazon</a>)</li>
<li>1x SATA Cable 60cm (<a href="https://www.amazon.com/CableCreation-2-Pack-8-inch-Female-Locking/dp/B01IBA41UK/?th=1" target="_blank" rel="noopener">Amazon</a>)</li>
<li>1x Noctua 120mm (<a href="https://www.amazon.com/Noctua-NF-A12x25-PWM-Premium-Quality-Quiet/dp/B07C5VG64V/" target="_blank" rel="noopener">Amazon</a>)</li>
</ul>
<hr />
<h2 id="assembly">Assembly</h2>
<h3 id="power-supply">Power Supply</h3>
<p>I started the assembly by installing the power supply into the designated space inside the case.<br />
To make the process easier, I recommend using a magnetic screwdriver, especially when securing the bracket at the bottom of the case, where access is tight.</p>
<p>The Flex ATX fits perfectly, and the orientation aligns well with the pre-installed cabling, simplifying the connection process.</p>
<p><img alt="FSP Flexguru 300W power supply mounted at the top of the case, above the empty board tray" loading="lazy" decoding="async" width="1900" height="1425" src="/_astro/power-supply.PBoTbRzY_ZEjoFq.webp" />
<em>Flexguru Flex ATX</em></p>
<h3 id="turing-pi-2-board">Turing Pi 2 Board</h3>
<p>Next, I secured the Turing Pi 2 board inside the case.<br />
The orientation is clearly guided by the cutouts for the USB and HDMI ports. Once the screws are tightened, I connected the front panel USB cable to the board.</p>
<p>Then I plugged in the 24-pin ATX power connector. The Flexguru cable is a 20+4 pin: just align and insert it carefully.</p>
<p>The final and most delicate step was wiring the <strong>power button and LED</strong> to the board.<br />
Locate the <strong>Front I/O pins</strong>: 10 in total, arranged in two rows.</p>
<p><img alt="Diagram of the Turing Pi 2 front I/O header: two rows of five pins, P-LED, RESET and their GND on the left, S-LED, POWER and their GND on the right" loading="lazy" decoding="async" width="903" height="728" src="/_astro/front-io.B86nOX4n_CdsG9.webp" />
<em>Front I/O pins</em></p>
<ul>
<li>Outer row (closest to the board edge):
<ul>
<li>Pin 1: P-LED (red)</li>
<li>Pin 2: GND (white)</li>
</ul>
</li>
<li>Inner row:
<ul>
<li>Pin 3 &amp; 4: Power button (black and green)</li>
</ul>
</li>
</ul>
<p>Lastly, I installed the battery. Mine came with a brown adapter for a CR1220 cell.<br />
⚠️ <strong>Don’t remove the adapter to use a larger battery (like CR2032) or the board won’t power on.</strong></p>
<hr />
<h3 id="ssd">SSD</h3>
<p>The case has space for up to three 2.5” SSDs.<br />
For the initial setup, I used just one, connected to one of the Turing Pi 2’s two SATA ports.</p>
<p>After mounting the SSD in the bracket, I used a 90° SATA connector and routed the cables <strong>under the board</strong> to optimize airflow.<br />
The case has handy cutouts for cable management.</p>
<hr />
<h3 id="cm4-modules">CM4 Modules</h3>
<p>Before inserting the CM4 modules, I attached <strong>passive heatsinks</strong> to each board:</p>
<ol>
<li>Apply thermal tape to the CPU and RAM</li>
<li>Position the aluminum heatsinks</li>
<li>Secure with screws</li>
</ol>
<p>⚠️ <strong>Important</strong>: the standoffs must be mounted on top of the CM4s, not underneath as some guides suggest, or the module won’t fit into the adapter.</p>
<p><img alt="Heatsink" loading="lazy" decoding="async" width="1900" height="1447" src="/_astro/heatsink.Dt0wyfTM_Z2umC9E.webp" />
<em>Geekworm mounted on CM4</em></p>
<p>To insert the CM4s:</p>
<ul>
<li>Align the CPU side toward the “Turing” label on the adapter</li>
<li>Press down gently until you hear the adapter clips snap into place</li>
</ul>
<hr />
<h3 id="cooling">Cooling</h3>
<p>I installed a 120mm fan on the side of the case, facing the CM4 modules.</p>
<p><img alt="Fan" loading="lazy" decoding="async" width="1900" height="1425" src="/_astro/fan.D_nET6rj_1fvWux.webp" />
<em>Noctua fan 120mm</em></p>
<p>The case already has four pre-drilled holes and includes screws.<br />
I used a <strong>Noctua fan</strong> with a 4-pin connector:</p>
<ul>
<li>Two pins: Power (V+ and GND)</li>
<li>Two pins: PWM (speed control)</li>
</ul>
<p>The Turing Pi 2 only has a 2-pin fan header, so I connected only the power pins. The fan now runs at default speed, which is enough for passive cooling.</p>
<p>💡 Mount the fan <strong>to extract</strong> air from the case, not blow it in.</p>
<hr />
<h2 id="first-boot">First Boot</h2>
<p>I connected a <strong>D-Link Archer C6</strong> in bridge mode to my Wi-Fi and ran an Ethernet cable from it to the Turing Pi 2.</p>
<p>To access the <strong>BMC web interface</strong>, you can use the hostname <code>turingpi.local</code> or the assigned IP address from your router.</p>
<p>⚠️ On macOS, <code>turingpi.local</code> might not resolve due to mDNS or Bonjour limitations.<br />
In that case, just add the IP to your <code>/etc/hosts</code> file like so:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="text"><code><span className="line"><span># replace the IP with yours</span></span>
<span className="line"><span>192.168.1.123 turingpi.local</span></span></code></pre>
<hr />
<h2 id="firmware-upgrade">Firmware Upgrade</h2>
<p>Upon logging into the BMC, I noticed it was running an early firmware version, with limited features, and <strong>no root SSH access</strong>.</p>
<p><img alt="Old firmware" loading="lazy" decoding="async" width="764" height="315" src="/_astro/old-firmware.DQUOQ_EQ_ZzHR6M.webp" />
<em>Old firmware (1.x)</em></p>
<p>I upgraded from version 1.x to 2.x as follows:</p>
<ul>
<li>Downloaded the image from <a href="https://firmware.turingpi.com/turing-pi2/" target="_blank" rel="noopener">Turingpi</a></li>
<li>Flashed it to a 32GB microSD with <a href="https://etcher.tortulandia.com/" target="_blank" rel="noopener">balenaEtcher</a></li>
<li>Powered off the Turing Pi 2, inserted the microSD, powered it back on</li>
<li>Waited for all 4 Ethernet LEDs to blink
<img alt="Ethernet led blinking" loading="lazy" decoding="async" width="1900" height="1535" src="/_astro/ethernet-blink.BmmlHlOT_Z2qwAAg.webp" /></li>
<li>Pressed the power button <strong>3 times</strong> quickly to confirm the upgrade</li>
<li>When the LEDs blinked <strong>twice</strong>, the update was complete</li>
<li>Removed the microSD and rebooted</li>
</ul>
<hr />
<h2 id="flashing-the-nodes">Flashing the Nodes</h2>
<p>I installed <strong>DietPi</strong> on all 4 CM4s, a lightweight Debian variant ideal for minimal CPU/RAM usage.</p>
<ul>
<li>Downloaded the image for Raspberry Pi 2/3/4/Zero 2 from <a href="https://dietpi.com" target="_blank" rel="noopener">dietpi.com</a></li>
<li>Used the BMC web interface to flash each CM4 via <strong>“Flash node”</strong>
<img alt="FLash node" loading="lazy" decoding="async" width="1224" height="533" src="/_astro/turing-flash.CVu24TqD_1ictjr.webp" /></li>
</ul>
<hr />
<h2 id="enabling-uart">Enabling UART</h2>
<p>To access the CM4s via serial console (through the USB port on the BMC), UART must be enabled.</p>
<h3 id="steps">Steps:</h3>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="bash"><code><span className="line"><span style={{ color: "#FFA657" }}>ssh</span><span style={{ color: "#A5D6FF" }}> root@</span><span style={{ color: "#FF7B72" }}>&lt;</span><span style={{ color: "#A5D6FF" }}>bmc-i</span><span style={{ color: "#E6EDF3" }}>p</span><span style={{ color: "#FF7B72" }}>&gt;</span></span>
<span className="line"><span style={{ color: "#8B949E" }}># tpi adavanced msd --node x  </span></span>
<span className="line"><span style={{ color: "#8B949E" }}># (x = 1 to 4)</span></span>
<span className="line"><span style={{ color: "#FFA657" }}>tpi</span><span style={{ color: "#A5D6FF" }}> advanced</span><span style={{ color: "#A5D6FF" }}> msd</span><span style={{ color: "#79C0FF" }}> --node</span><span style={{ color: "#79C0FF" }}> 1</span><span style={{ color: "#E6EDF3" }}> </span></span>
<span className="line"></span>
<span className="line"><span style={{ color: "#FFA657" }}>mkdir</span><span style={{ color: "#A5D6FF" }}> /mnt/boot</span></span>
<span className="line"><span style={{ color: "#FFA657" }}>mount</span><span style={{ color: "#A5D6FF" }}> /dev/sda1</span><span style={{ color: "#A5D6FF" }}> /mnt/boot</span></span>
<span className="line"></span>
<span className="line"><span style={{ color: "#FFA657" }}>vi</span><span style={{ color: "#A5D6FF" }}> /mnt/boot/config.txt</span></span>
<span className="line"><span style={{ color: "#8B949E" }}># Add this under [all]</span></span>
<span className="line"><span style={{ color: "#E6EDF3" }}>enable_uart</span><span style={{ color: "#FF7B72" }}>=</span><span style={{ color: "#A5D6FF" }}>1</span></span>
<span className="line"></span>
<span className="line"><span style={{ color: "#FFA657" }}>umount</span><span style={{ color: "#A5D6FF" }}> /mnt/boot</span></span>
<span className="line"><span style={{ color: "#FFA657" }}>tpi</span><span style={{ color: "#A5D6FF" }}> power</span><span style={{ color: "#A5D6FF" }}> off</span><span style={{ color: "#79C0FF" }}> -n</span><span style={{ color: "#79C0FF" }}> 1</span></span>
<span className="line"><span style={{ color: "#FFA657" }}>tpi</span><span style={{ color: "#A5D6FF" }}> power</span><span style={{ color: "#A5D6FF" }}> on</span><span style={{ color: "#79C0FF" }}> -n</span><span style={{ color: "#79C0FF" }}> 1</span></span></code></pre>
<hr />
<h2 id="serial-access-with-picocom">Serial Access with <code>picocom</code></h2>
<p>The BMC comes with <code>picocom</code> preinstalled for direct node access.</p>
<p>First, identify the correct device under <code>/dev</code>.<br />
⚠️ <strong>Note</strong>: Node numbering on pre-2.5 versions is non-linear:</p>
<ul>
<li>Node 1 → <code>/dev/ttyS2</code></li>
<li>Node 2 → <code>/dev/ttyS1</code></li>
<li>Node 3 → <code>/dev/ttyS4</code></li>
<li>Node 4 → <code>/dev/ttyS5</code></li>
</ul>
<p>To connect to Node 1:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="bash"><code><span className="line"><span style={{ color: "#FFA657" }}>picocom</span><span style={{ color: "#A5D6FF" }}> /dev/ttyS2</span><span style={{ color: "#79C0FF" }}> -b</span><span style={{ color: "#79C0FF" }}> 115200</span></span></code></pre>
<p>💡 <strong>Why 115200?</strong><br />
It’s the default baud rate for Raspberry Pi serial interfaces. Without it, you’ll see garbage output or nothing at all.</p>
<p>In another terminal:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="bash"><code><span className="line"><span style={{ color: "#FFA657" }}>tpi</span><span style={{ color: "#A5D6FF" }}> power</span><span style={{ color: "#A5D6FF" }}> off</span><span style={{ color: "#79C0FF" }}> -n</span><span style={{ color: "#79C0FF" }}> 1</span></span>
<span className="line"><span style={{ color: "#FFA657" }}>tpi</span><span style={{ color: "#A5D6FF" }}> power</span><span style={{ color: "#A5D6FF" }}> on</span><span style={{ color: "#79C0FF" }}> -n</span><span style={{ color: "#79C0FF" }}> 1</span></span></code></pre>
<p>If everything is configured correctly, you’ll see the boot log in <code>picocom</code>.</p>
<p>Default DietPi credentials:</p>
<pre className="astro-code github-dark-default" style={{ backgroundColor: "#0d1117", color: "#e6edf3", overflowX: "auto" }} tabIndex={0} data-language="text"><code><span className="line"><span>Username: root</span></span>
<span className="line"><span>Password: dietpi</span></span></code></pre>
<hr />
<h2 id="whats-next">What’s Next</h2>
<p>At this stage, you should have a fully assembled cluster:</p>
<ul>
<li>4 nodes, accessible via SSH</li>
<li>BMC web interface and root access via SSH</li>
<li>Serial console working for debugging</li>
</ul>
<p>In the next post, we’ll dive into Kubernetes: installing K3s, configuring the cluster, and deploying your first containers.</p>
<p><strong>Stay tuned: the fun starts now.</strong> 🚀</p>
</div></div><footer className="article__foot grid-12" data-astro-cid-zg7dkzxc><div className="author" data-astro-cid-zg7dkzxc><p className="note" data-astro-cid-zg7dkzxc>Written by</p><p className="h3" data-astro-cid-zg7dkzxc>Thanzeer J</p><p className="author__bio" data-astro-cid-zg7dkzxc>Full-Stack Developer &amp; Software Developer based in Kerala, India. Building modern web and mobile applications.</p><a href="/contact" className="btn" data-astro-cid-zg7dkzxc>Work with me <span className="arrow" data-astro-cid-zg7dkzxc>→</span></a></div><a href="/freelance-and-full-remote-a-guide-to-surviving-part-2" className="next" data-astro-cid-zg7dkzxc><span className="note" data-astro-cid-zg7dkzxc>Next post · Freelance</span><span className="h2 next__title" data-astro-cid-zg7dkzxc>Freelance and full remote: a guide to surviving. Part 2</span></a></footer></article>
    </>
  );
}
