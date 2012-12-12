<script>
//需要Base64见：http://www.webtoolkit.info/javascript-base64.html
function make_base_auth(user, password) {
  var tok = user + ':' + pass;
  var hash = Base64.encode(tok);
  return "Basic " + hash;
} 

var auth = make_base_auth('QLeelulu','mypassword');
var url = 'http://example.com'; 

// 原始JavaScript
xml = new XMLHttpRequest();

xml.open('GET',url) 
xml.setRequestHeader('Authorization', auth);
// ExtJS
Ext.Ajax.request({
    url : url,
    method : 'GET',
    headers : { Authorization : auth }
}); 

// jQuery
$.ajax({
    url : url,
    method : 'GET',
    beforeSend : function(req) {
        req.setRequestHeader('Authorization', auth);
    }
});
</script>
