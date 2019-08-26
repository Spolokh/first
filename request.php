<?php

$errors = [];

if ( !isset( $_POST['Counter'], $_POST['Url'] ) ) {
    $errors[] = 'Error 500';   //exit('Error 500');
}

$int = $_POST['Counter'] ? intval($_POST['Counter']) : 0;
$url = $_POST['Url'] ? $_POST['Url'] : '';

if (empty($int)) {
    $errors[] = 'Not Request!';
}

if (empty($url)) {
    $errors[] = 'No Url!';
}

if ( !$connect = pg_connect("host=localhost dbname=postgres user=postgres password='' ") ) {
    $errors[] = 'No connect!';
} 


if ( reset($errors) ){
    
    header('HTTP/1.0 500 Internal Server Error');
    echo join ( ', ', array_values($errors) );
	exit () ;
}

switch ($url) {

    case '/api/stat/AddCounter':
        
        $query = "UPDATE public.article SET Counter = Counter + $int";
        
       /* $query  = "INSERT INTO public.article (counter)
            VALUES ($int)
            ON CONFLICT (counter)
            DO UPDATE SET counter = counter + $int";*/
        
        $query  = pg_query($query) or die('Ошибка запроса: ' . pg_last_error());

        $result = pg_query($connect, "SELECT * FROM public.article");

        $row = pg_fetch_assoc($result);
        echo $row['counter'];
    
        pg_free_result($result);
    
    break;

    default:
        echo "o";
     
}

/*
CREATE TABLE article
(
  counter integer DEFAULT 0
);
*/