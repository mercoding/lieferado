const layout1 = [
    { id: 'head', name: 'header', url: './templates/header.html' },
    { id: 'dropdown', name: 'dropdown', url: './templates/dropdown.html'},
    { id: 'top', name: 'top', url: './templates/top.html'},
    { id: 'nav', name: 'nav', url: './templates/nav.html' },
    { id: 'left', name: 'left', url: './templates/empty.html' },
    { id: 'center', name: 'main', url: './templates/center.html' },
    { id: 'right', name: 'right', url: './templates/right.html' },
    { id: 'bottom', name: 'bottom', url: './templates/bottom.html' },
    { id: 'foot', name: 'footer', url: './templates/footer.html' },
    { id: 'overlay', name: 'overlay', url: './templates/overlay.html' }
];



export function getLayout() {
    return layout1;
}