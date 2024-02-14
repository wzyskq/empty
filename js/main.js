// 禁用右击
document.oncontextmenu = function () {
    return false;
}

let num;
const root = document.documentElement;
const rootStyles = getComputedStyle(root);
const bar = document.querySelector('.bar');
// console.log(rootStyles.getPropertyValue('--clock-top'));

// 自动隐藏鼠标
let timeout;
document.addEventListener('mousemove', () => {
    clearTimeout(timeout);
    document.body.style.cursor = 'auto';
    timeout = setTimeout(() => {
        document.body.style.cursor = 'none';
    }, 2000);
});

// 获取json数据
function fetchData() {
    return fetch('js/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

fetchData().then(data => {
    // console.log(typeof data);
    // console.log(data.length);
    // console.log(data[theme]['clockShadowOpacity']);

    for (let i = 0; i < data.length; i++) {
        const radio = document.createElement('input');
        radio.className = 'themeImg';
        radio.type = 'radio';
        radio.name = 'themeImg'
        bar.appendChild(radio);
    }

    const themeImg = document.querySelectorAll('.themeImg');

    for (let i = 0; i < data.length; i++) {
        themeImg[i].style.cssText = `background-image:url(${data[i]['background'].slice(1)})`
    }

    themeImg.forEach((radio, index) => {
        radio.addEventListener('click', () => {
            if (radio.checked) {
                localStorage.setItem('themeImg', index);
                num = index;
                updata(data, num);
            }
        })
    });
    if (localStorage.getItem('themeImg') == undefined) { localStorage.setItem('themeImg', 1)};
    num = localStorage.getItem('themeImg');
    themeImg[num].checked = true;
    updata(data, num);
});

// 更新数据
function updata(data, num) {
    root.style.setProperty("--background-image", `url(${data[num]['background']})`);
    root.style.setProperty("--clock-shadow-color-opacity", `${data[num]['clockShadowOpacity']}`);
    root.style.setProperty("--clock-top", `${data[num]['clockLocate'][0]}`);
    root.style.setProperty("--clock-left", `${data[num]['clockLocate'][1]}`);
}

// let keys = Object.keys(localStorage);
// for(let key of keys) {
//   console.log(`${key}: ${localStorage.getItem(key)}`);
// }
