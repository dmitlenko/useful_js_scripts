// ==UserScript==
// @name         Klasna.com Youtube Embed
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Denis Mitlenko
// @match        https://*.klasna.com/*
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    let parseAndAdd = (url) => {
        let a = $('<a>', {
            href: url
        });
        console.log(a.prop('hostname'));
        if (a.prop('hostname') == 'www.youtube.com' || a.prop('hostname') == 'youtube.com'){
            const params = new URLSearchParams(a.prop('search'));
            add(params.get('v'));
        }
        else if (a.prop('hostname') == 'youtu.be'){
            add(a.prop('pathname').substring(1));
        }
        else {
            alert('Невірне посилання!');
            return false;
        }
        return true;
    }
    let add = (id) => {
        let obj = CKEDITOR.dom.element.createFromHtml('<iframe width="560" height="315" src="https://www.youtube.com/embed/'+id+'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
        CKEDITOR.instances['SiteMenu_content'].insertElement(obj);
    }
    let box = $('form > .f_l.w760p');
    let title = $('<h4 class="dashed"><span>Вставка відео</span></h4>');
    let content = $('<div class="d_no"><div class="row" style="white-space:nowrap"><label for="SiteMenu_meta_title">Посилання:</label><br><input style="width:640px;display:inline-block;margin-right:10px;" id="vidlink" type="text"><input style="display:inline-block" class="button3" id="vidpaste" type="button" value="Вставити"></div></div>');
    title.insertBefore($(box).find('.f_l').last());
    content.insertAfter(title);
    title.click(() => {
        content.toggleClass('d_no');
    });
    $('#vidpaste').click(() => {
        let url = $('#vidlink').val();
        if (parseAndAdd(url)) $('#vidlink').val('');
    });
})();