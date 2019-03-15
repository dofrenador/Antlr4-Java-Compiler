import java.util.HashMap;
import java.util.Map;
import java.util.*;

public class EvalVisitor extends LabeledExprBaseVisitor<Double> {
    /** "memory" for our calculator; variable/value pairs go here */
    Map<String, Double> memory = new HashMap<String, Double>();
    double a;
    
    /** ID '=' expr NEWLINE */
    @Override
    public Double visitAssign(LabeledExprParser.AssignContext ctx) {
        String id = ctx.ID().getText();  // id is left-hand side of '='
        Double value = visit(ctx.expr());   // compute value of expression on right
        memory.put(id, value);           // store it in our memory
        System.out.println(value);   
        return value;
    }
    /** ID '+=' expr NEWLINE */
    @Override
    public Double visitAssignPlus(LabeledExprParser.AssignPlusContext ctx) {
        String id = ctx.ID().getText();  // id is left-hand side of '='
        Double value = visit(ctx.expr());   // compute value of expression on right
        memory.put(id, value + memory.get(ctx.ID().getText()));           // store it in our memory
        System.out.println(memory.get(id));
        //System.out.println(value);   
        return value;
    }

     /** ID '-=' expr NEWLINE */
     @Override
     public Double visitAssignMinus(LabeledExprParser.AssignMinusContext ctx) {
         String id = ctx.ID().getText();  // id is left-hand side of '='
         Double value = visit(ctx.expr());   // compute value of expression on right
         memory.put(id, memory.get(ctx.ID().getText())- value);           // store it in our memory
         System.out.println(memory.get(id));
         //System.out.println(value);   
         return value;
     }

      /** ID '*=' expr NEWLINE */
      @Override
      public Double visitAssignMultiply(LabeledExprParser.AssignMultiplyContext ctx) {
          String id = ctx.ID().getText();  // id is left-hand side of '='
          Double value = visit(ctx.expr());   // compute value of expression on right
          memory.put(id, memory.get(ctx.ID().getText())*value);           // store it in our memory
          System.out.println(memory.get(id));
          //System.out.println(value);   
          return value;
      }
        
      /** ID '/=' expr NEWLINE */
      @Override
      public Double visitAssignDivide(LabeledExprParser.AssignDivideContext ctx) {
          String id = ctx.ID().getText();  // id is left-hand side of '='
          Double value = visit(ctx.expr());   // compute value of expression on right
          memory.put(id, memory.get(ctx.ID().getText())/value);           // store it in our memory
          System.out.println(memory.get(id));
          //System.out.println(value);   
          return value;
      }
     
    /** expr NEWLINE */
    @Override
    public Double visitPrintExpr(LabeledExprParser.PrintExprContext ctx) {
        Double value = visit(ctx.expr()); // evaluate the expr child
        System.out.println(value);         // print the result
        return 0.0;                          // return dummy value
    }

    /** INT */
    @Override
    public Double visitInt(LabeledExprParser.IntContext ctx) {
        return Double.valueOf(ctx.INT().getText());
    }

    /** Double */
    public Double visitDouble(LabeledExprParser.DoubleContext ctx) {
        return Double.valueOf(ctx.DOUBLE().getText());
    }

    /** ID */
    @Override
    public Double visitId(LabeledExprParser.IdContext ctx) {
        String id = ctx.ID().getText();
        if ( memory.containsKey(id) ) return memory.get(id);
        return 0.0;
    }
    /**expr op '^' expr */
    @Override
    public Double visitPow(LabeledExprParser.PowContext ctx){
        Double left = visit(ctx.expr(0));  // get value of left subexpression
        Double right = visit(ctx.expr(1)); // get value of right subexpression
        return  (Math.pow(left,right));
    }

    /**NEGATE */
    @Override
    public Double visitNegate(LabeledExprParser.NegateContext ctx){
        String id = ctx.ID().getText();
        if ( memory.containsKey(id) ) return 0.0 - memory.get(id);
        return 0.0;
    }

    /**Multiply */
    @Override
    public Double visitMul(LabeledExprParser.MulContext ctx) {
        Double left = visit(ctx.expr(0));  // get value of left subexpression
        Double right = visit(ctx.expr(1)); // get value of right subexpression
        return left * right;
    }
    /**Divide*/
    @Override
    public Double visitDiv(LabeledExprParser.DivContext ctx) {
        Double left = visit(ctx.expr(0));  // get value of left subexpression
        Double right = visit(ctx.expr(1)); // get value of right subexpression
        return left / right;
    }

    /**NOT*/
    @Override
    public Double visitNot(LabeledExprParser.NotContext ctx) {
        Double value = this.visit(ctx.expr());
        if(value == 0)
        return 1.0;
        else 
        return 0.0;
    }
    /**AndAnd */
    @Override
    public Double visitAndAnd(LabeledExprParser.AndAndContext ctx){
        Double left = visit(ctx.expr(0));
        Double right = visit(ctx.expr(1));
        if(left == 0.0 || right == 0.0)   
        return 0.0;
        else 
        return 1.0;
    }

     /**OrOr */
     @Override
     public Double visitOrOr(LabeledExprParser.OrOrContext ctx){
         Double left = visit(ctx.expr(0));
         Double right = visit(ctx.expr(1));
         if(left == 0.0 && right == 0.0)   
         return 0.0;
         else 
         return 1.0;
     }


    /** Substraction*/
    @Override
    public Double visitSub(LabeledExprParser.SubContext ctx) {
        Double left = visit(ctx.expr(0));  // get value of left subexpression
        Double right = visit(ctx.expr(1)); // get value of right subexpression
        return left - right; // must be SUB
    }
    /**Addition */
    @Override
    public Double visitAdd(LabeledExprParser.AddContext ctx) {
        Double left = visit(ctx.expr(0));  // get value of left subexpression
        Double right = visit(ctx.expr(1)); // get value of right subexpression
        return left + right; // must be SUB
    }
    @Override/** Modulo*/
    public Double visitModulo(LabeledExprParser.ModuloContext ctx){
        Double left = visit(ctx.expr(0));  // get value of left subexpression
        Double right = visit(ctx.expr(1)); // get value of right subexpression
        return left % right;
    }
    /** increment right*/
    @Override
    public Double visitIncrementRight(LabeledExprParser.IncrementRightContext ctx){
        String id = ctx.ID().getText();
        if(memory.containsKey(id)){
            memory.put(id, memory.get(id)+1.0);
        }
        else{
            memory.put(id, 1.0);
        }
        return memory.get(id);
    }
    /** increment left*/
    @Override
    public Double visitIncrementLeft(LabeledExprParser.IncrementLeftContext ctx){
        String id = ctx.ID().getText();
        if(memory.containsKey(id)){
            memory.put(id, memory.get(id)+1.0);
        }
        else{
            memory.put(id, 1.0);
        }
        return memory.get(id);
    }
    /** decrement left*/
    @Override
    public Double visitDecrementLeft(LabeledExprParser.DecrementLeftContext ctx){
        String id = ctx.ID().getText();
        if(memory.containsKey(id)){
            memory.put(id, memory.get(id)-1.0);
        }
        else{
            memory.put(id, -1.0);
        }
        return memory.get(id);
    }
    /** decrement right*/
    @Override
    public Double visitDecrementRight(LabeledExprParser.DecrementRightContext ctx){
        String id = ctx.ID().getText();
        if(memory.containsKey(id)){
            memory.put(id, memory.get(id)-1.0);
        }
        else{
            memory.put(id, -1.0);
        }
        return memory.get(id);
    }

    /**Greater*/
    @Override
    public Double visitGreater(LabeledExprParser.GreaterContext ctx){
        
        Double left = visit(ctx.expr(0));
        Double right = visit(ctx.expr(1));
        if(left > right)
        return 1.0;
        else
        return 0.0;
    }

     /**GreaterEqual*/
     @Override
     public Double visitGreaterEqual(LabeledExprParser.GreaterEqualContext ctx){
         
         Double left = visit(ctx.expr(0));
         Double right = visit(ctx.expr(1));
         if(left >= right)
         return 1.0;
         else
         return 0.0;
     }
      /**LesserEqual*/
      @Override
      public Double visitLesserEqual(LabeledExprParser.LesserEqualContext ctx){
          
          Double left = visit(ctx.expr(0));
          Double right = visit(ctx.expr(1));
          if(left <= right)
          return 1.0;
          else
          return 0.0;
      }

     /**Lesser*/
     @Override
     public Double visitLesser(LabeledExprParser.LesserContext ctx){
         
         Double left = visit(ctx.expr(0));
         Double right = visit(ctx.expr(1));
         if(left < right)
         return 1.0;
         else
         return 0.0;
     }

      /**comparison*/
      @Override
      public Double visitComparison(LabeledExprParser.ComparisonContext ctx){ 
          Double left = visit(ctx.expr(0));
          Double right = visit(ctx.expr(1));
          if(Double.compare(left,right) == 0)
          return 1.0;
          else
          return 0.0;
      }

       /**notequal*/
     @Override
     public Double visitNotEqual(LabeledExprParser.NotEqualContext ctx){
         
         Double left = visit(ctx.expr(0));
         Double right = visit(ctx.expr(1));
         if(Double.compare(left,right) == 0)
         return 0.0;
         else
         return 1.0;
    }

     @Override
     public Double visitRead(LabeledExprParser.ReadContext ctx){
        String id = ctx.ID().getText();    
        Scanner reader = new Scanner(System.in);  // Reading from System.in
        System.out.println("Enter a number: ");
        a = reader.nextDouble();
        System.out.println("You entered: " + a);
        memory.put(id,a);
        return a;
    }

    /** sin */
    @Override
    public Double visitSin(LabeledExprParser.SinContext ctx)
    {
        Double value = this.visit(ctx.expr());
        return Math.sin(value);
    }

    /** cos */
    @Override
    public Double visitCos(LabeledExprParser.CosContext ctx)
    {
        Double value = this.visit(ctx.expr());
        return Math.cos(value);
    }

    /** ln */
    @Override
    public Double visitLn(LabeledExprParser.LnContext ctx)
    {
        Double value = this.visit(ctx.expr());
        return Math.log(value);
    }
    /**exp */
    @Override
    public Double visitExp(LabeledExprParser.ExpContext ctx)
    {
        Double value = this.visit(ctx.expr());
        return Math.exp(value);
    }
    /** sqrt */
    @Override
    public Double visitSqrt(LabeledExprParser.SqrtContext ctx)
    {
        Double value = this.visit(ctx.expr());
        return Math.sqrt(value);
    }
    /**for*/
    @Override
    public Double visitFloop(LabeledExprParser.FloopContext ctx){ //(a = 5 to 10 do){}
        Double start = this.visit(ctx.expr(0));
        Double stop = this.visit(ctx.expr(1));
        for(Double i = start; i <= stop; i++){
            for (LabeledExprParser.StatContext stat : ctx.stat()) {
                this.visit(stat);
            }
        }
        return 0.0;
    }

    /**while */
    @Override
    public Double visitWhile(LabeledExprParser.WhileContext ctx) {

    // Evaluate the relational expression and continue the while
    // loop as long as it is true (does not equal zero).
    while (this.visit(ctx.expr()) != 0) {

        // Evaluate all statements inside the while loop.
        for (LabeledExprParser.StatContext stat : ctx.stat()) {
            this.visit(stat);
        }
    }
    return 0.0;
    }

    /**simpleIf */
    @Override
    public Double visitJustif(LabeledExprParser.JustifContext ctx){
        Double value = this.visit(ctx.expr(0));
        System.out.println(value);
        int count = 0;
        int i = 0;
        for (LabeledExprParser.ExprContext expr : ctx.expr()) {
            count++;
        }
        count = count / 2;
        if(value == 1){ //mean if is true 
            for (i = 1; i <= count; i++) {
                System.out.println(this.visit(ctx.expr(i)));
            }
                //System.out.println("IF HIT");
        }
        else{
            for (i=count+1; i <= count*2; i++) {
                System.out.println(this.visit(ctx.expr(i)));
            }
            // System.out.println("ELSE HIT");
        }
        return 1.0;
    }


    @Override
    public Double visitParens(LabeledExprParser.ParensContext ctx) {
        return visit(ctx.expr()); // return child expr's value
    }

}