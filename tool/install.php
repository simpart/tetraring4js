<?php
try {
    /* load module target */
    $tgt = yaml_parse_file(__DIR__ . '/target.yml');
    if (false === $tgt) {
        throw new Exception('failed load target');
    }
    
    /** start deploy **/
    /* load template */
    $tmpl = file_get_contents(__DIR__. '/../src/tetraring.tmpl');
    if (false === $tmpl) {
        throw new Exception('failed load template');
    }
    /* replace module source */
    foreach ($tgt as $tgt_key => $tgt_val) {
        $tag  = '{@' . $tgt_key . '}';
        $repl = '';
        if (true === $tgt_val) {
            $repl = file_get_contents(__DIR__ . '/../src/' . $tgt_key . '.js');
        }
        $tmpl = str_replace($tag, $repl, $tmpl);
    }
    $ret = file_put_contents(__DIR__ . '/../tetraring.js', $tmpl);
    if (false === $ret) {
        throw new Exception('failed write ' . __DIR__ . '/../tetraring.js');
    }
} catch (Exception $e) {
    echo $e->getMessage() . PHP_EOL;
}
/* end of file */
