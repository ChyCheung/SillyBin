
const element = document.querySelector('.nav-menu');
function toggleActive(element) {
    element.classList.toggle("active");
}

createParagraph = () => {

    let leftHeight = document.querySelector('.main-left').style.minHeight;
    document.querySelector('.main-left').style.minHeight = `${parseInt(leftHeight) + 200}px`;
    // document.querySelector('content-more').style.display = 'none';

    const content = document.querySelector('.content-item');
    const contentItem = document.createElement('div');
    contentItem.classList.add('flex--row');
    contentItem.classList.add('content-item');
    contentItem.innerHTML = `${content.innerHTML}`;
    document.querySelector('.content-container').appendChild(contentItem);
    const hr = document.createElement('hr');
    document.querySelector('.content-container').appendChild(hr);
}

document.querySelector('.btn-more').addEventListener('click', createParagraph);
document.querySelector('content-more').style.display = 'flex';