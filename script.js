function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}
loco();


const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});

function files(index) {
  var data = `
  https://images.prismic.io/alphas/ZtIoBUaF0TcGJmtW_ezgif-frame-001.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoBkaF0TcGJmtX_ezgif-frame-002.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoB0aF0TcGJmtY_ezgif-frame-003.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoBUaF0TcGJmtW_ezgif-frame-001.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoBkaF0TcGJmtX_ezgif-frame-002.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoB0aF0TcGJmtY_ezgif-frame-003.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoBUaF0TcGJmtW_ezgif-frame-001.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoBkaF0TcGJmtX_ezgif-frame-002.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoB0aF0TcGJmtY_ezgif-frame-003.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoBkaF0TcGJmtX_ezgif-frame-002.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoB0aF0TcGJmtY_ezgif-frame-003.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoBUaF0TcGJmtW_ezgif-frame-001.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoBkaF0TcGJmtX_ezgif-frame-002.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoB0aF0TcGJmtY_ezgif-frame-003.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoBUaF0TcGJmtW_ezgif-frame-001.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoBkaF0TcGJmtX_ezgif-frame-002.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoB0aF0TcGJmtY_ezgif-frame-003.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoCEaF0TcGJmtZ_ezgif-frame-004.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoCUaF0TcGJmta_ezgif-frame-005.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoCkaF0TcGJmtb_ezgif-frame-006.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoC0aF0TcGJmtc_ezgif-frame-007.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoDEaF0TcGJmtd_ezgif-frame-008.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoDkaF0TcGJmte_ezgif-frame-009.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoD0aF0TcGJmtf_ezgif-frame-010.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoE0aF0TcGJmtg_ezgif-frame-011.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoGEaF0TcGJmtl_ezgif-frame-012.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoHUaF0TcGJmtq_ezgif-frame-013.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoIUaF0TcGJmtr_ezgif-frame-014.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoI0aF0TcGJmts_ezgif-frame-015.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoJUaF0TcGJmtt_ezgif-frame-016.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoJ0aF0TcGJmtu_ezgif-frame-017.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoKUaF0TcGJmtv_ezgif-frame-018.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoK0aF0TcGJmtw_ezgif-frame-019.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoLUaF0TcGJmtx_ezgif-frame-020.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoMEaF0TcGJmty_ezgif-frame-021.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoNEaF0TcGJmt0_ezgif-frame-022.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoNkaF0TcGJmt1_ezgif-frame-023.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoOkaF0TcGJmt2_ezgif-frame-024.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoPUaF0TcGJmt3_ezgif-frame-025.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoQkaF0TcGJmt4_ezgif-frame-026.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoRkaF0TcGJmt5_ezgif-frame-027.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoSEaF0TcGJmt6_ezgif-frame-028.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoS0aF0TcGJmt7_ezgif-frame-029.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoTkaF0TcGJmt8_ezgif-frame-030.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoUEaF0TcGJmt9_ezgif-frame-031.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoVEaF0TcGJmt-_ezgif-frame-032.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoWkaF0TcGJmt__ezgif-frame-033.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoXkaF0TcGJmuA_ezgif-frame-034.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoYkaF0TcGJmuC_ezgif-frame-035.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoZkaF0TcGJmuD_ezgif-frame-036.png?auto=format,compress
https://images.prismic.io/alphas/ZtIobEaF0TcGJmuE_ezgif-frame-037.png?auto=format,compress
https://images.prismic.io/alphas/ZtIocUaF0TcGJmuF_ezgif-frame-038.png?auto=format,compress
https://images.prismic.io/alphas/ZtIod0aF0TcGJmuH_ezgif-frame-039.png?auto=format,compress
https://images.prismic.io/alphas/ZtIofEaF0TcGJmuI_ezgif-frame-040.png?auto=format,compress
https://images.prismic.io/alphas/ZtIogUaF0TcGJmuK_ezgif-frame-041.png?auto=format,compress
https://images.prismic.io/alphas/ZtIohkaF0TcGJmuM_ezgif-frame-042.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoiUaF0TcGJmuN_ezgif-frame-043.png?auto=format,compress
https://images.prismic.io/alphas/ZtIojUaF0TcGJmuO_ezgif-frame-044.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoj0aF0TcGJmuP_ezgif-frame-045.png?auto=format,compress
https://images.prismic.io/alphas/ZtIokUaF0TcGJmuQ_ezgif-frame-046.png?auto=format,compress
https://images.prismic.io/alphas/ZtIok0aF0TcGJmuS_ezgif-frame-047.png?auto=format,compress
https://images.prismic.io/alphas/ZtIolUaF0TcGJmuT_ezgif-frame-048.png?auto=format,compress
https://images.prismic.io/alphas/ZtIol0aF0TcGJmuU_ezgif-frame-049.png?auto=format,compress
https://images.prismic.io/alphas/ZtIomUaF0TcGJmuV_ezgif-frame-050.png?auto=format,compress
https://images.prismic.io/alphas/ZtIom0aF0TcGJmuW_ezgif-frame-051.png?auto=format,compress
https://images.prismic.io/alphas/ZtIonEaF0TcGJmuX_ezgif-frame-052.png?auto=format,compress
https://images.prismic.io/alphas/ZtIonUaF0TcGJmuY_ezgif-frame-053.png?auto=format,compress
https://images.prismic.io/alphas/ZtIonkaF0TcGJmuZ_ezgif-frame-054.png?auto=format,compress
https://images.prismic.io/alphas/ZtIon0aF0TcGJmua_ezgif-frame-055.png?auto=format,compress
https://images.prismic.io/alphas/ZtIooEaF0TcGJmub_ezgif-frame-056.png?auto=format,compress
https://images.prismic.io/alphas/ZtIooUaF0TcGJmuc_ezgif-frame-057.png?auto=format,compress
https://images.prismic.io/alphas/ZtIookaF0TcGJmue_ezgif-frame-058.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoo0aF0TcGJmuf_ezgif-frame-059.png?auto=format,compress
https://images.prismic.io/alphas/ZtIopEaF0TcGJmug_ezgif-frame-060.png?auto=format,compress
https://images.prismic.io/alphas/ZtIopUaF0TcGJmuh_ezgif-frame-061.png?auto=format,compress
https://images.prismic.io/alphas/ZtIopkaF0TcGJmui_ezgif-frame-062.png?auto=format,compress
https://images.prismic.io/alphas/ZtIop0aF0TcGJmuj_ezgif-frame-063.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoqEaF0TcGJmuk_ezgif-frame-064.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoqUaF0TcGJmul_ezgif-frame-065.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoqkaF0TcGJmum_ezgif-frame-066.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoq0aF0TcGJmun_ezgif-frame-067.png?auto=format,compress
https://images.prismic.io/alphas/ZtIorEaF0TcGJmuo_ezgif-frame-068.png?auto=format,compress
https://images.prismic.io/alphas/ZtIorUaF0TcGJmup_ezgif-frame-069.png?auto=format,compress
https://images.prismic.io/alphas/ZtIorkaF0TcGJmuq_ezgif-frame-070.png?auto=format,compress
https://images.prismic.io/alphas/ZtIor0aF0TcGJmur_ezgif-frame-071.png?auto=format,compress
https://images.prismic.io/alphas/ZtIosEaF0TcGJmus_ezgif-frame-072.png?auto=format,compress
https://images.prismic.io/alphas/ZtIosUaF0TcGJmut_ezgif-frame-073.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoskaF0TcGJmuu_ezgif-frame-074.png?auto=format,compress
https://images.prismic.io/alphas/ZtIos0aF0TcGJmuv_ezgif-frame-075.png?auto=format,compress
https://images.prismic.io/alphas/ZtIotEaF0TcGJmuw_ezgif-frame-076.png?auto=format,compress
https://images.prismic.io/alphas/ZtIotUaF0TcGJmux_ezgif-frame-077.png?auto=format,compress
https://images.prismic.io/alphas/ZtIotkaF0TcGJmuy_ezgif-frame-078.png?auto=format,compress
https://images.prismic.io/alphas/ZtIot0aF0TcGJmuz_ezgif-frame-079.png?auto=format,compress
https://images.prismic.io/alphas/ZtIouEaF0TcGJmu0_ezgif-frame-080.png?auto=format,compress
https://images.prismic.io/alphas/ZtIouUaF0TcGJmu1_ezgif-frame-081.png?auto=format,compress
https://images.prismic.io/alphas/ZtIoukaF0TcGJmu2_ezgif-frame-082.png?auto=format,compress
https://images.prismic.io/alphas/ZtIou0aF0TcGJmu3_ezgif-frame-083.png?auto=format,compress
https://images.prismic.io/alphas/ZtIovEaF0TcGJmu4_ezgif-frame-084.png?auto=format,compress
 `;
  return data.split("\n")[index];
}

const frameCount = 84;


const images = [];
const imageSeq = {
  frame: 1,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = files(i);
  images.push(img);
}

gsap.to(imageSeq, {
  frame: frameCount - 1,
  snap: "frame",
  ease: `none`,
  scrollTrigger: {
    scrub: 0.15,
    trigger: `#page>canvas`,
    start: `top top`,
    end: `300% top`,
    scroller: `#main`,
  },
  onUpdate: render,
});

images[1].onload = render;

function render() {
  scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.max(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}
ScrollTrigger.create({
  trigger: "#page>canvas",
  pin: true,
  // markers:true,
  scroller: `#main`,
  start: `top top`,
  end: `300% top`,
});