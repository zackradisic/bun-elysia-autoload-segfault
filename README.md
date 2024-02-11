# Bun elysia-autoload segfault

Trying to reproduce/investigate [#8522](https://github.com/oven-sh/bun/issues/8522).

I found that the issue is not related to Glob at all. I've commented out the use of Glob in [node_modules/elysia-autoload/dist/index.js](/node_modules/elysia-autoload/dist/index.js)

If you run the script manually:

```bash
bun-debug run src/index.ts --watch
```

It results in a crash like this:

```
ASSERTION FAILED: JS assertion failed at line 1 in:
function (promise, value)
{
    "use strict";

    @assert(@isPromise(promise));
    @assert((@getPromiseInternalField(promise, @promiseFieldFlags) & @promiseStateMask) == @promiseStatePending);

    var flags = @getPromiseInternalField(promise, @promiseFieldFlags);
    var reactions = @getPromiseInternalField(promise, @promiseFieldReactionsOrResult);
    @putPromiseInternalField(promise, @promiseFieldReactionsOrResult, value);
    @putPromiseInternalField(promise, @promiseFieldFlags, flags | @promiseStateFulfilled);

    @triggerPromiseReactions(@promiseStateFulfilled, reactions, value);
}

false
/Users/runner/work/WebKit/WebKit/Source/JavaScriptCore/runtime/JSGlobalObject.cpp(413) : JSC::EncodedJSValue JSC::assertCall(JSGlobalObject *, CallFrame *)
1   0x1035fed98 WTFCrash
2   0x1045c9b40 void JSC::StackVisitor::visit<(JSC::StackVisitor::EmptyEntryFrameAction)0, JSC::assertCall(JSC::JSGlobalObject*, JSC::CallFrame*)::$_0>(JSC::CallFrame*, JSC::VM&, JSC::assertCall(JSC::JSGlobalObject*, JSC::CallFrame*)::$_0 const&, bool)
3   0x13800c03c 2   ???                                 0x000000013800c03c 0x0 + 5234540604
4   0x13804abc4 3   ???                                 0x000000013804abc4 0x0 + 5234797508
5   0x1380ab1f8 4   ???                                 0x00000001380ab1f8 0x0 + 5235192312
6   0x104e07cb4 vmEntryToJavaScript
7   0x1041bd92c JSC::Interpreter::executeCallImpl(JSC::VM&, JSC::JSObject*, JSC::CallData const&, JSC::JSValue, JSC::ArgList const&)
8   0x10462b3ec JSC::runJSMicrotask(JSC::JSGlobalObject*, WTF::ObjectIdentifierGeneric<JSC::MicrotaskIdentifierType, WTF::ObjectIdentifierThreadSafeAccessTraits>, JSC::JSValue, JSC::JSValue, JSC::JSValue, JSC::JSValue, JSC::JSValue)
9   0x10488b3e4 JSC::VM::drainMicrotasks()
10  0x102df3b74 Bun::JSNextTickQueue::drain(JSC::VM&, JSC::JSGlobalObject*)
11  0x102eb78b4 Zig::GlobalObject::drainMicrotasks()
12  0x102eb78ec JSC__JSGlobalObject__drainMicrotasks
13  0x10124f314 src.bun.js.event_loop.EventLoop.drainMicrotasksWithGlobal
14  0x1016fb22c src.bun.js.event_loop.EventLoop.tickQueueWithCount__anon_176230
15  0x10124f1b4 src.bun.js.event_loop.EventLoop.tickWithCount
16  0x100e60a9c src.bun.js.event_loop.EventLoop.tick
17  0x1017fb890 src.bun.js.event_loop.EventLoop.waitForPromise
18  0x10133655c src.bun.js.javascript.VirtualMachine.waitForPromise
19  0x101601ee0 src.bun.js.javascript.VirtualMachine.loadEntryPoint
20  0x1010e8828 src.bun_js.Run.start
21  0x100c8372c src.bun.js.javascript.OpaqueWrap__anon_48014__struct_88179.callback
22  0x102f1c914 JSC__VM__holdAPILock
23  0x1008d0dcc src.bun.js.bindings.bindings.VM.holdAPILock
24  0x100bc5884 src.bun_js.Run.boot
25  0x100bc89a4 src.cli.run_command.RunCommand.exec__anon_69072
26  0x100be1aec src.cli.Command.start
27  0x100814400 src.cli.Cli.start__anon_3992
28  0x100811508 src.main.main
29  0x1008111b0 main
30  0x185f93f28 start
zsh: segmentation fault  bun-debug run src/index.ts --watch
```
