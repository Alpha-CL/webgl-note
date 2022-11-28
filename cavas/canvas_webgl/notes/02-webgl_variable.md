# webgl variable

## introduction

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// webgle variable type


    - attribute         // 传输与顶点相关的数据
    
    - uniform           // 传输的是对所有顶点都相同或者与顶点无关的数据( 只读 )
    
    - varying           // 建立 顶点着色器 和 片元着色器 之间的通信
                        // 在 vertexShader 中修改 varying，在 fragmentShader 中使用 varying
                           ( 弥补 attribute 无法在 fragmentShader 中定义/使用的缺陷 )


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


// Naming conventions

webgl 变量命名建议使用 单个字母的类型前缀，为了方便区分类型


    attribute a_CamelCase;
    
    uniform u_CamelCase;
    
    varying v_CamelCase;


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

#### attribute

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


1. 只能在 vertexShader( 顶点着色器 ) 中使用
   不能在 fragmentShader( 片元着色器 ) 中 定义/使用


2. 在 application 中使用

    - setter: gl.vertexAttrib3f(a_CamelCase, ...data);
        
        gl.vertexAttrib1f(location, v0)
        gl.vertexAttrib2f(location, v0, v1)
        gl.vertexAttrib3f(location, v0, v1, v2)
        gl.vertexAttrib4f(location, v0, v1, v2, v3)
    
    - getter: gl.getAttribLocation(gl.program, a_CamelCase): data;


一般用于: 顶点坐标，法线，纹理坐标，顶点颜色等


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


使用 attribute，一般需要以下几个步骤:

    1. 在顶点着色器中，声明 attribute变量;
    
    2. 将 attribute变量 赋值给 gl_Position变量;
    
    3. 向 attribute变量 传输数据;


//-------------------------------------------------------------------------------------------------------------------//


// vertexShader( 顶点着色器 )


    attribute vec4 a_position;                  // a 顶点坐标信息
    attribute vec2 a_texCoord0;                 // 纹理信息
    
    uniform mat4 u_matViewProjection;
    
    varying vec2 v_texCoord;
    
    void main(void) {
        gl_Position = u_matViewProjection * a_position;
        v_texCoord = a_texCoord0;
    }


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


// fragmentShader( 片元着色器 )


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


// application


    ... ...

    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');      // 获取 attribute变量 中的存储位置
    
    gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);                           // 将顶点位置传输给attribute变量          

    ... ...


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

#### uniform

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


1. uniform 是 "外部程序" 传递给 vertexShader( 顶点着色器 ) & fragmentShader 的变量

2. 在 vertexShader( 顶点着色器 ) & fragmentShader( 片元着色器 ) 中 uniform 仅可使用不可修改( readOnly )

3. uniform 在 vertexShader( 顶点着色器 ) & fragmentShader( 片元着色器 ) 中必须保持声明的类型一致( 相当于全局变量 )
   ( 也可以声明不一致，则无法在两个着色器中同时使用 )

4. 在 application 中使用
    
    - setter: glUniform**();
        
        gl.uniform1f(location, v0)
        gl.uniform2f(location, v0, v1)
        gl.uniform3f(location, v0, v1, v2)
        gl.uniform4f(location, v0, v1, v2, v3)
        ... ...

    - getter: gl.getUniformLocation(gl.program, u_CamelCase): data;


一般用于: 变换矩阵，材质，光照参数和颜色信息等


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


使用 uniform，一般需要以下几个步骤:

    1. 在着色器中声明 uniform变量
    
    2. 在 JavaScript程序 中获取 uniform变量 的存储地址
    
    3. 在 JavaScript程序 中通过 gl.uniform4f() 同族函数向着色器中的 uniform变量 传值


//-------------------------------------------------------------------------------------------------------------------//


// vertexShader( 顶点着色器 )


    uniform mat4 viewProjMatrix;    // 投影 + 视图矩阵
    uniform mat4 viewMatrix;        // 视图矩阵
    uniform vec3 lightPosition;     // 光源位置


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


// fragmentShader( 片元着色器 )


    uniform mat4 viewProjMatrix;    // 投影 + 视图矩阵
    uniform mat4 viewMatrix;        // 视图矩阵
    uniform vec3 lightPosition;     // 光源位置


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


// application


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

#### varying

``` javascript
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



1. varying 变量通常用于在 vertexShader( 顶点着色器 ) 与 fragmentShader( 片元着色器 ) 之间传递数据
    a. 一般在 vertexShader 中修改 varying
    b. 在 fragmentShader 中使用 varying

2. uniform 在 vertexShader( 顶点着色器 ) & fragmentShader( 片元着色器 ) 中必须保持声明的类型一致( 相当于全局变量 )


一般用于: 在 vertexShader 中修改 varying，在 fragmentShader 中使用 varying


//-------------------------------------------------------------------------------------------------------------------//


// vertexShader( 顶点着色器 )

    attribute vec4 a_position;
    attribute vec2 a_texCoord0;
    
    uniform mat4 u_matViewProjection;

    varying vec2 v_texCoord;            // Varying in vertex shader
    
    void main(void) {
        gl_Position = u_matViewProjection * a_position;
        v_texCoord = a_texCoord0;
    }


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


// fragmentShader( 片元着色器 )


    precision mediump float;
     
    uniform sampler2D s_baseMap;
    uniform sampler2D s_lightMap;
    
    varying vec2 v_texCoord;            // Varying in fragment shader
    
    void main() {
        vec4 baseColor;
        vec4 lightColor;
        baseColor = texture2D(s_baseMap, v_texCoord);
        lightColor = texture2D(s_lightMap, v_texCoord);
        gl_FragColor = baseColor * (lightColor + 0.25);
    }


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//


// application



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```













