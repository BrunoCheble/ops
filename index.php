<?php 
if(isset($_GET['lang']) && $_GET['lang'] == 'en')
  include_once('./index-en.html'); 
else
  include_once('./index3.html'); 
?>