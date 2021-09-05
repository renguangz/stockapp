import React from 'react';

export let addStockToList = false;

export const SideBarData = [
    {
        title: '走勢',
        id: 'move'
    },
    {
        title: '基本',
        id: 'basic'
    },
    {
        title: 'K線',
        id: 'tech'
    },
    {
        title: '籌碼',
        id: 'chip'
    },
    {
        title: addStockToList ?  '新增至清單' : '從清單移除',
        id: 'add',
    },
]