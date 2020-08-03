let obj = JSON.parse($response.body);

obj.data.vip.type = 2;
obj.data.vip.status = 2;
obj.data.vip.due_date = 1643817600000;
obj.data.vip.vip_pay_type = 1;
obj.data.vip.theme_type = 1;
obj.data.vip.label.path = "http://i0.hdslb.com/bfs/vip/label_overdue.png";

$done({body: JSON.stringify(obj)});