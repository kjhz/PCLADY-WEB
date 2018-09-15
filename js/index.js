
//whenReady 当文档准备就绪时调用函数
const whenReady = (function() {
    const funcs = [];
    const ready = false;

    function handler(e) {
        if (ready) return;
        if (e.type === "readystatechange" && document.readyState !== "complete") return;

        for( let i=0; i< funcs.length; i++) {
            funcs[i].call(document);
        }

        ready = true;
        funcs = null;
    }

    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", handler, false);
        document.addEventListener("readystatechange", handler, false);
        window.addEventListener("load", handler, false);
    }
    else if (document.attachEvent) {
        document.attachEvent("onreadystatechange", handler);
        window.attachEvent("onload", handler);
    }

    return function whenReady(f) {
        if (ready) f.call(document);
        else funcs.push(f);
    }
})();

/* footer tab分页 */
function tab(tabHead, tabContent){
    const heads = document.querySelectorAll(tabHead)
         ,contents = document.querySelectorAll(tabContent);
    for(var i=0;i<heads.length;i++) {
        var timer = null;
        heads[i].onmouseover =  function (num) {
            return function(){
                clearTimeout(timer);
                timer = setTimeout(function(){
                    for(var j=0; j<heads.length;j++)
                    {
                        heads[j].className = "";
                        contents[j].className = "";
                    }
                    heads[num].className = "current";
                    contents[num].className = "show";
                },300)

            }
        }(i);
        heads[i].onmouseout = function() {
            clearTimeout(timer);
        }
    }
}
whenReady(tab("footer .tabBox span", "footer .tabContent>div"));
whenReady(tab("#main-nav>ul>li", ".nav-channel>ul>li"));

function validateForm(form) {
    let value = form["account"].value;
    if (value === "" || value === null) {
        const p = document.createElement("p");
        const txt = document.createTextNode("请输入用户名和密码");
        p.style = "position:absolute; color:red; top:0";
        p.appendChild(txt);
        form.insertBefore(p, form.childNodes[0]);
        return false;
    }
}