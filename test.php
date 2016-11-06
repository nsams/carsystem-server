<?php
echo file_get_contents('http://10.0.0.101/servo.cgi?Nr=0&Pos=24');
//Nr ... Servo Nummer (0-23)
//Pos ... Position (0-124)

/*
 Befehle:
 * - position setzen
 *   /servo.cgi?action=posset&Nr=0&Pos=1
 * - initialposition setzen (TODO)
 *   /servo.cgi?action=possetdefault&Nr=0&Pos=1
 * - position abfragen (TODO)
 *   /servo.cgi?action=posget&Nr=0
 * 
 * Antwort:
 * 200: OK
 * 500: Fehler (TODO)
 */
