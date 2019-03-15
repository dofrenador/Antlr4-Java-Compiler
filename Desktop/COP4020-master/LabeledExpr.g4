grammar LabeledExpr; 

prog:   stat+ ;


loop:   'while' '('expr')' NEWLINE? '{'stat*'}'   #while
    ;

forStatement:  'for(' ID '=' expr 'to' expr 'do' '){'stat*'}' #floop
    ;

simpleIf  : 'if' '(' expr* ')' '{'expr*'}' NEWLINE*? (ELSE '{' expr* '}')?        #justif    
    ;

stat:   expr NEWLINE?               # PrintExpr 
    |   ID '=' expr NEWLINE         # Assign
    |   ID '+=' expr NEWLINE        # AssignPlus
    |   ID '-=' expr NEWLINE        # AssignMinus
    |   ID '*=' expr NEWLINE        # AssignMultiply
    |   ID '/=' expr NEWLINE        # AssignDivide    
    |   loop NEWLINE                # whileLoop
    |   forStatement NEWLINE        # forstatements
    |   simpleIf NEWLINE            # sdasdsa
    |   NEWLINE                     # Blank
    ;


expr:   expr op='^'  expr          # Pow
    |   expr op='*'  expr          # Mul
    |   expr op='/'  expr          # Div
    |   expr op='-'  expr          # Sub
    |   expr op='+'  expr          # Add    
    |   expr op='%'  expr          # Modulo 
    |        op='-'  ID            # Negate 
    |        op='++' ID            # IncrementLeft
    |        op='--' ID            # DecrementLeft
    |        ID     op='++'        # IncrementRight
    |        ID     op='--'        # DecrementRight
    |        op='!'  expr          # Not  
    |   expr op='&&' expr          # AndAnd
    |   expr op='||' expr          # OrOr
    |   expr op='>'  expr          # Greater
    |   expr op='<'  expr          # Lesser
    |   expr op='>=' expr          # GreaterEqual
    |   expr op='<=' expr          # LesserEqual
    |   expr op='==' expr          # Comparison
    |   expr op='!=' expr          # NotEqual 
    |   SIN  expr ')'              # Sin
    |   COS  expr ')'              # Cos
    |   LN   expr ')'              # Ln
    |   EXP  expr ')'              # Exp
    |   SQRT expr ')'              # Sqrt 
    |   ID '=' READ                # Read
    |   INT                        # Int
    |   DOUBLE                     # Double 
    |   ID                         # id
    |   '(' expr ')'               # Parens
    ;

MUL :   '*' ; // assigns token name to '*' used above in grammar
DIV :   '/' ;
ADD :   '+' ;
SUB :   '-' ;
MOD :   '%' ;
POW :   '^' ;
NOT :   '!' ;
SIN :   's(' ;
COS :   'c(' ;
LN  :   'l(' ;
EXP :   'e(' ; 
SQRT:   'sqrt(' ;
READ:   'read()';
ANDAND: '&&';
OROR :  '||';
INCREMENT : '++';
DECREMENT : '--';
ASSIGNPLUS : '+=';
ASSIGNMINUS : '-=';
ASSIGNMULTIPLY : '*=';
ASSIGNDIVIDE : '/=';
IF : 'if';
For : 'for';
To : 'to';
Do : 'do';
ELSE : 'else';
WHILE : 'while';
TRUE : 'true';
FALSE : 'false';
GREATER : '>';
LESSER : '<';
GREATEREQ : '>=';
LESSEREQ : '<=' ;
COMPARE : '==';
NOTEQUAL : '!=';
ID  :   [a-zA-Z]+ ;      // match identifiers
INT :   [0-9]+ ;         // match integers
DOUBLE: '-'?[0-9]+('.'[0-9]+)?; //match doubles
NEWLINE:'\r'? '\n' ;     // return newlines to parser (is end-statement signal)
WS  :   [ \t]+ -> skip ; // toss out whitespace
COMMENT: '/*' .*? '*/' -> skip; //skip comments