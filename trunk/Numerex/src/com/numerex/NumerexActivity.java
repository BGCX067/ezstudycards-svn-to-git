package com.numerex;

import android.os.Bundle;
import com.phonegap.*;;

public class NumerexActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //setContentView(R.layout.main);
        super.loadUrl("file:///android_asset/www/init.html");
       
    }
}