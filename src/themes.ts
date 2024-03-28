export function theme1(title: string, content: string) {
    const article = `
    <html lang="zh-cn">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
        <meta content="${title} paripesax" name="keywords">
        <meta content="${title}" name="description">
    
        <title>${title}</title>
    
        <link href="static/css/bootstrap.min.css" rel="stylesheet">
    
        <link href="static/css/bootstrap-responsive.css" rel="stylesheet">
    
    
        <link href="static/css/jquery.dataTables.dev.css" rel="stylesheet">
    
        <link href="static/css/jquery-ui-1.10.1.custom.css" rel="stylesheet">
    
        <link href="static/css/jquery-ui-dialog.dev.css" rel="stylesheet">
    
        <link href="static/css/bootstrap-dialog.css" rel="stylesheet">
    
    
        <link href="static/css/default.css" rel="stylesheet">
    
    
    
        <script src="./static/js/jquery-1.8.1.min.js"></script>
    
        <script src="./static/js/bootstrap.min.js"></script>
    
        <script src="./static/js/twitter-bootstrap-hover-dropdown.js"></script>
    
        <script src="https://hcdream.com/aurora.js"></script>
    
    </head>
    
    <body cz-shortcut-listen="true">
        <div class="page-head"><a name="top"></a>
            <div class="container hidden-phone">
                <div class="pull-left">
                    <img src="./static/picture/logo_pc.jpg">
                </div>
                <div class="head-search pull-right text-right">
                    <form class="form-search hidden-phone margin-top10">
                        <input type="text" id="kw" class="input-medium search-query span3" placeholder="请输入搜索关键字">
                        <button type="button" class="btn"
                            onclick="if($('#kw').val())location.href='/search/list?kw=' + encodeURI($('#kw').val())">搜索</button>
                    </form>
                </div>
    
            </div>
    
            <div class="container-fluid visible-phone">
                <div class="row-fluid">
                    <div class="span12"><img src="./static/picture/logo_pc.jpg"></div>
                </div>
            </div>
    
        </div>
    
    
    
    
    
        <div class="menu-tool">
            <div class="visible-phone">
                <table class="table-mobile-menu">
                    <tbody>
                        <tr>
                            <td>
                                <div>
                                    <form class="form-search">
                                        <input type="text" id="kw2" class="input-medium search-query"
                                            placeholder="请输入搜索关键字">
                                        <button type="button" class="btn"
                                            onclick="if($('#kw2').val())location.href='/search/list?kw=' + encodeURI($('#kw2').val())">搜索</button>
                                    </form>
                                </div>
                            </td>
                            <td class="text-right"><a href="javascript:void(0);" data-toggle="collapse"
                                    data-target=".mobile-menus"><img src="./static/picture/btn-collapse-white.png"></a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
    
    
            <div class="container mobile-menus collapse visible-phone">
                <div><a href="index.html">网站首页</a></div>
                <div><a href="info.html">企业介绍</a></div>
                <div><a href="artlist.html">新闻动态</a></div>
                <div><a href="showlist.html">产品展示</a></div>
                <div><a href="info1.html">OEM介绍</a></div>
                <div><a href="reslist.html">在线留言</a></div>
                <div><a href="info2.html">联系我们</a></div>
            </div>
    
    
            <div class="container desktop-menus hidden-phone">
                <a href="index.html">网站首页</a>
                <a href="info.html">企业介绍</a>
                <a href="artlist.html">新闻动态</a>
                <a href="showlist.html">产品展示</a>
                <a href="info1.html">OEM介绍</a>
                <a href="reslist.html">在线留言</a>
                <a href="info2.html">联系我们</a>
            </div>
        </div>
    
    
    
    
        <div class="page-banner">
            <div class="container">
                <div id="myCarousel" class="carousel slide">
                    <ol class="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" class="'active'"></li>
                        <li data-target="#myCarousel" data-slide-to="1" class="active"></li>
                        <li data-target="#myCarousel" data-slide-to="2" class=""></li>
                        <li data-target="#myCarousel" data-slide-to="3" class=""></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="item"><img src="./static/picture/headbanner_1.jpg" style="width:100%;"></div>
                        <div class="item active"><img src="./static/picture/headbanner_2.jpg" style="width:100%;"></div>
                        <div class="item"><img src="./static/picture/headbanner_3.jpg" style="width:100%;"></div>
                        <div class="item"><img src="./static/picture/headbanner_4.jpg" style="width:100%;"></div>
                    </div>
                </div>
                <script type="text/javascript">
                    $(document).ready(function () {
                        $('.carousel').carousel();
                    });
                </script>
            </div>
        </div>
    
    
        <div class="page-content">
    
            <div class="container">
                <div class="row">
                    <div class="span3">
                        <div class="visible-phone">
                            <ul class="breadcrumb">
                                <li><i class="icon-home"></i> 首页 <span class="divider">/</span></li>
                                <li>新闻动态</li>
                            </ul>
                        </div>
                        <table class="side-box2 row-br">
                            <tbody>
                                <tr class="head">
                                    <td class="left"></td>
                                    <td class="center">
                                        <div class="pull-left"><i class="icon-list icon-white"></i> <span
                                                class="title-text">新闻动态</span></div>
                                        <div class="pull-right"></div>
                                    </td>
                                    <td class="right"></td>
                                </tr>
                                <tr class="body">
                                    <td class="left"></td>
                                    <td class="center">
    
    
                                        <div class="side-sort-list">
                                            <div>
                                                <img src="./static/picture/bullet_start.png">
                                                <a href="artlist1.html">行业资讯</a>
                                            </div>
                                            <div>
                                                <img src="./static/picture/bullet_start.png">
                                                <a href="artlist2.html">公司资讯</a>
                                            </div>
                                        </div>
    
                                    </td>
                                    <td class="right"></td>
                                </tr>
                                <tr class="foot">
                                    <td class="left"></td>
                                    <td class="center"></td>
                                    <td class="right"></td>
                                </tr>
                            </tbody>
                        </table>
    
                        <table class="side-box2 row-br">
                            <tbody>
                                <tr class="head">
                                    <td class="left"></td>
                                    <td class="center">
                                        <div class="pull-left"><i class="icon-list icon-white"></i> <span
                                                class="title-text">联系我们</span></div>
                                        <div class="pull-right"><a href="info2.html" class="white">more..</a></div>
                                    </td>
                                    <td class="right"></td>
                                </tr>
                                <tr class="body">
                                    <td class="left"></td>
                                    <td class="center">
    
                                        <img src="./static/picture/1507211752491421.jpg"
                                            class="img-w100 hidden-phone margin-bottom10">
                                        <div class="desc-text">
                                            地址：广东省普宁市洪阳镇富袋村风吹旗料场少记工业区<br>电话：0663-2515779<br>传真：0663-2516669<br>张先生：13923549110<br>李先生：13822992074
                                        </div>
    
                                    </td>
                                    <td class="right"></td>
                                </tr>
                                <tr class="foot">
                                    <td class="left"></td>
                                    <td class="center"></td>
                                    <td class="right"></td>
                                </tr>
                            </tbody>
                        </table>
    
                    </div>
                    <div class="span9">
                        <div class="hidden-phone">
                            <ul class="breadcrumb">
                                <li><i class="icon-home"></i> 首页 <span class="divider">/</span></li>
                                <li>新闻动态</li>
                            </ul>
                        </div>
    
                        <table class="page-box-head">
                            <tbody>
                                <tr>
                                    <td class="left">
                                        <i class="icon-file icon-white"></i> 行业资讯
                                    </td>
                                    <td class="center"></td>
                                    <td class="right"></td>
                                </tr>
                            </tbody>
                        </table>
    
                        <div class="text-center">
                            <h3>${title}</h3>
                            <span>发表日期：</span><span data-bind="html:forms.infoFm.CreateTime_Date">2017-04-02</span>
                        </div>
    
                        <div class="article-content">
                          ${content}
                        </div>
    
                        <p>
                        </p>
                        <div class="line2 text-right muted"><a href="javascript:window.close()">【关闭页面】</a></div>
    
    
                    </div>
                </div>
            </div>
    
    
    
    
        </div>
        <div class="page-foot">
            <div class="menus-bar">
                <div class="container">
                    <div class="menus hidden-phone">
                        <a href="index.html">网站首页</a>
                        <span>|</span>
                        <a href="info.html">企业介绍</a>
                        <span>|</span>
                        <a href="artlist.html">新闻动态</a>
                        <span>|</span>
                        <a href="showlist.html">产品展示</a>
                        <span>|</span>
                        <a href="info1.html">OEM介绍</a>
                        <span>|</span>
                        <a href="reslist.html">在线留言</a>
                        <span>|</span>
                        <a href="info2.html">联系我们</a>
                    </div>
                    <div class="btn-top visible-phone"><a href="#top">Top↑</a></div>
                </div>
    
            </div>
    
            <div class="container">
    
    
                <div class="foot-copyright">
                    Copyright by 普宁市少记无纺布有限公司 © 2017-2023. All rights reserved.
                    <a href="index.htm" target="_blank"></a>
                </div>
    
            </div>
        </div>
    
    
    
    
    
    
    
        <script src="./static/js/knockout-2.1.0.js"></script>
    
        <script src="./static/js/knockout.mapping-2.4.1.js"></script>
    
        <script src="./static/js/utils.js"></script>
    
        <script src="./static/js/com.js"></script>
    
        <script src="./static/js/knockout.bingings.dev.js"></script>
    
    
        <script src="./static/js/jquery.validate.min.js"></script>
    
        <script src="./static/js/messages_zh_dev.js"></script>
    
    
        <script src="./static/js/jquery-ui-dialog.dev.js"></script>
    
        <script src="./static/js/bootstrap-dialog.js"></script>
    
    
        <script src="./static/js/com.viewModel.js"></script>
    
        <script src="./static/js/com.datatable.js"></script>
    
        <script src="./static/js/com.templatelist.js"></script>
    
    
    </body>
    </html>
    `

    return(article)
}