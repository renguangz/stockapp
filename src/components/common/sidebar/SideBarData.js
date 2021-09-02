import React from 'react';

export let addStockToList = false;

export const SideBarData = [
    {
        title: '走勢',
        path: '/walk',
        className: 'active',
        id: 'move'
    },
    {
        title: '基本',
        path: '/',
        icon: <div>home icons</div>,
        className: '',
        id: 'basic'
    },
    {
        title: 'K線',
        path: '/list',
        icon: <div>list icons</div>,
        className: '',
        id: 'tech'
    },
    {
        title: '籌碼',
        path: '/stockinfo',
        icon: <div>info icons</div>,
        className: '',
        id: 'chip'
    },
    {
        title: addStockToList ?  '新增至清單' : '從清單移除',
        path: '/news',
        icon: <div>news icons</div>,
        className: '',
        id: 'add',
    },
]